package cn.stormbirds.expressDelivery.service.impl;

import cn.stormbirds.expressDelivery.entity.AuthUser;
import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.LogisticCodeBean;
import cn.stormbirds.expressDelivery.entity.LogisticsTrackingSubBean;
import cn.stormbirds.expressDelivery.mapper.ExpressTrackingMapper;
import cn.stormbirds.expressDelivery.service.GetIdService;
import cn.stormbirds.expressDelivery.service.IExpressTrackingService;
import cn.stormbirds.expressDelivery.service.LogisticsTrackingService;
import cn.stormbirds.expressDelivery.utils.ExcelUtils;
import cn.stormbirds.expressDelivery.utils.KdniaoUtil;
import cn.stormbirds.expressDelivery.utils.SysUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cn.stormbirds.expressDelivery.utils.CommonParameters.*;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
@Slf4j
@Service
public class ExpressTrackingServiceImpl extends ServiceImpl<ExpressTrackingMapper, ExpressTracking> implements IExpressTrackingService {
    //电商ID
    private String EBusinessID = "1575163";
    /**
     * 电商加密私钥，快递鸟提供，注意保管，不要泄漏
     */
    private String AppKey = "f0c1ba54-540c-491f-a18c-8cb01f6346dc";

    /**
     * 测试请求url
     */
    private String ReqURL = "http://testapi.kdniao.com:8081/api/dist";
    //正式请求url
    //private String ReqURL = "http://api.kdniao.com/api/dist";

    @Autowired
    private RestTemplate restTemplate;

    private final GetIdService idService;
    @Autowired
    private LogisticsTrackingService logisticsTrackingService;


    @Autowired
    public ExpressTrackingServiceImpl(GetIdService idService) {
        this.idService = idService;
    }

    @Override
    public List<ExpressTracking> importByExcel(MultipartFile file) {
        AuthUser user = SysUtil.getCurrentUser();
        if (user == null) {
            throw new RuntimeException("未找到用户");
        }
        List<LogisticCodeBean> logisticCodeBeans = ExcelUtils.readExcel(LogisticCodeBean.class, file);
        if (logisticCodeBeans.size() > 0) {
            List<ExpressTracking> expressTrackingList = logisticCodeBeans.stream()
                    .filter(logisticCodeBean -> getOne(Wrappers.<ExpressTracking>lambdaQuery()
                            .eq(ExpressTracking::getPlatformId, "")
                            .eq(ExpressTracking::getPlatformOrderId, logisticCodeBean.getOrderId())) == null)
                    .map(logisticCodeBean -> {
                        String LogisticCode = logisticCodeBean.getLogisticCode().startsWith(SHIPPER_CODE_YTO) ?
                                logisticCodeBean.getLogisticCode().substring(SHIPPER_CODE_YTO.length()) :
                                logisticCodeBean.getLogisticCode();
                        if (LogisticCode.startsWith(SHIPPER_CODE_ZTO)) {
                            LogisticCode = LogisticCode.substring(SHIPPER_CODE_ZTO.length());
                        }
                        return ExpressTracking.builder()
                                .id(idService.getId()).itemNum(Integer.valueOf(logisticCodeBean.getItemCount()))
                                .itemTitle(logisticCodeBean.getItemName())
                                .logisticStatus(LOGISTIC_STATUS_UNKNOWN)
                                .platformId(user.getId())
                                .platformOrderId(logisticCodeBean.getOrderId())
                                .receiverAddress(logisticCodeBean.getShippingAddress())
                                .receiverArea(logisticCodeBean.getReceiverArea())
                                .receiverCity(logisticCodeBean.getReceiverCity())
                                .receiverName(logisticCodeBean.getReceiver())
                                .receiverPhone(logisticCodeBean.getReceiverPhone())
                                .receiverProvince(logisticCodeBean.getReceiverProvince())
                                //TODO 这里暂时写死了判断不是圆通则为中通，后面扩展需要更改，因为来源单号物流编码不规范需要做标准物流公司的编码映射
                                .shipperCode(logisticCodeBean.getLogisticCode().startsWith(SHIPPER_CODE_YTO) ? "YTO" : "ZTO")
                                .trackingNo(LogisticCode)
                                .trackingStatus(TRACKING_STATUS_RECORD).build();
                    })
                    .collect(Collectors.toList());

            if (saveBatch(expressTrackingList)) {
                subLogisticsTracking(expressTrackingList);
                return expressTrackingList;
            }
        }
        return null;
    }


    @Override
    public boolean subLogisticsTracking(ExpressTracking subBean) {
        ExpressTracking expressTrackingTmp = getById(subBean.getId());
        if (expressTrackingTmp != null && expressTrackingTmp.getLogisticStatus() != TRACKING_STATUS_RECORD) {
            return false;
        }
        String requestData = JSON.toJSONString(new LogisticsTrackingSubBean(subBean,"管理员","17792294757","17792294757","陕西省","西安市","碑林区","十字路口") );
        Map<String, String> params = new HashMap<String, String>();
        params.put("EBusinessID", EBusinessID);
        params.put("RequestType", "1008");
        try {
            params.put("RequestData", KdniaoUtil.urlEncoder(requestData, "UTF-8"));
            String dataSign = KdniaoUtil.encrypt(requestData, AppKey, "UTF-8");
            params.put("DataSign", KdniaoUtil.urlEncoder(dataSign, "UTF-8"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        //请求、返回数据类型：2-json；
        params.put("DataType", "2");
        JSONObject result = restTemplate.postForObject(ReqURL, params, JSONObject.class);

        log.info("物流订单 {} 订阅结果 {}", requestData, result);

        if (result != null && result.getBoolean("Success")) {
            subBean.setLogisticStatus(TRACKING_STATUS_RUNNING);
            save(subBean);
            return true;
        } else {
            //TODO 这里push消息给用户提醒用户订阅失败
        }
        return false;
    }

    @Async("asyncPoolTaskExecutor")
    @Override
    public void subLogisticsTracking(List<ExpressTracking> expressTrackingList) {
        for (ExpressTracking expressTracking : expressTrackingList) {
            subLogisticsTracking(expressTracking);
        }
    }


}
