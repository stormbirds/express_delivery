package cn.stormbirds.expressDelivery.service.impl;

import cn.stormbirds.expressDelivery.entity.*;
import cn.stormbirds.expressDelivery.mapper.ExpressTrackingMapper;
import cn.stormbirds.expressDelivery.service.*;
import cn.stormbirds.expressDelivery.utils.ExcelUtils;
import cn.stormbirds.expressDelivery.utils.KdniaoUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cn.stormbirds.expressDelivery.entity.KdNiaoRequestType.INSTANT_QUERY;
import static cn.stormbirds.expressDelivery.entity.KdNiaoRequestType.LOGISTICS_TRACKING_SUB;
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
    /**
     * 电商ID
     */
    @Value(value = "${kdniao.EBusinessID}")
    private String EBusinessID ;
    /**
     * 电商加密私钥，快递鸟提供，注意保管，不要泄漏
     */
    @Value(value = "${kdniao.AppKey}")
    private String AppKey ;

    @Autowired
    private RestTemplate restTemplate;

    private final GetIdService idService;
    @Autowired
    private LogisticsTrackingService logisticsTrackingService;
    @Autowired
    private SendMailService mailService;
    @Autowired
    private ISysUserService userService;

    @Autowired
    public ExpressTrackingServiceImpl(GetIdService idService) {
        this.idService = idService;
    }

    @Override
    public List<ExpressTracking> importByExcel(MultipartFile file, Long userId) {
        List<LogisticCodeBean> logisticCodeBeans = ExcelUtils.readExcel(LogisticCodeBean.class, file);
        if (logisticCodeBeans.size() > 0) {
            List<ExpressTracking> expressTrackingList = logisticCodeBeans.stream()
                    .filter(logisticCodeBean -> getOne(Wrappers.<ExpressTracking>lambdaQuery()
                            .eq(ExpressTracking::getPlatformId, userId)
                            .eq(ExpressTracking::getPlatformOrderId, logisticCodeBean.getOrderId())) == null)
                    .map(logisticCodeBean -> {
                        String logisticCode = logisticCodeBean.getLogisticCode().startsWith(SHIPPER_CODE_YTO) ?
                                logisticCodeBean.getLogisticCode().substring(SHIPPER_CODE_YTO.length()) :
                                logisticCodeBean.getLogisticCode();
                        if (logisticCode.startsWith(SHIPPER_CODE_ZTO)) {
                            logisticCode = logisticCode.substring(SHIPPER_CODE_ZTO.length());
                        }
                        return ExpressTracking.builder()
                                .id(idService.getId()).itemNum(Integer.valueOf(logisticCodeBean.getItemCount()))
                                .itemTitle(logisticCodeBean.getItemName())
                                .logisticStatus(LOGISTIC_STATUS_UNKNOWN)
                                .platformId(userId)
                                .platformOrderId(logisticCodeBean.getOrderId())
                                .receiverAddress(logisticCodeBean.getShippingAddress())
                                .receiverArea(logisticCodeBean.getReceiverArea())
                                .receiverCity(logisticCodeBean.getReceiverCity())
                                .receiverName(logisticCodeBean.getReceiver())
                                .receiverPhone(logisticCodeBean.getReceiverPhone())
                                .receiverProvince(logisticCodeBean.getReceiverProvince())
                                //TODO 这里暂时写死了判断不是圆通则为中通，后面扩展需要更改，因为来源单号物流编码不规范需要做标准物流公司的编码映射
                                .shipperCode(logisticCodeBean.getLogisticCode().startsWith(SHIPPER_CODE_YTO) ? "YTO" : "ZTO")
                                .trackingNo(logisticCode)
                                .trackingStatus(TRACKING_STATUS_RECORD).build();
                    })
                    .collect(Collectors.toList());
            if(expressTrackingList.isEmpty()){
                return Collections.emptyList();
            }
            if (saveOrUpdateBatch(expressTrackingList)) {
                return expressTrackingList;
            }else{
                log.info("保存快递单到数据库失败 {}", JSONObject.toJSONString(expressTrackingList) );
            }
        }
        return null;
    }


    @Override
    public boolean subLogisticsTracking(ExpressTracking subBean) {
        ExpressTracking expressTrackingTmp = getById(subBean.getId());
        if (expressTrackingTmp != null && expressTrackingTmp.getLogisticStatus() != TRACKING_STATUS_RECORD) {
            log.info("该订单已订阅 {}",subBean.toString());
            return false;
        }
        SysUser user = userService.getById(subBean.getPlatformId());
        String requestData = JSON.toJSONString(new LogisticsTrackingSubBean(subBean,"管理员","17792294757","17792294757","陕西省","西安市","碑林区","十字路口") );

        JSONObject result = kdniaoPost(requestData,LOGISTICS_TRACKING_SUB,null);


        if (result != null && result.getBoolean("Success")) {
            subBean.setLogisticStatus(TRACKING_STATUS_RUNNING);
            updateById(subBean);
            log.info("物流订单：{} 订阅成功：{}", requestData, result);
            return true;
        } else {
            //TODO 这里push消息给用户提醒用户订阅失败
            log.info("物流订单：{} 订阅失败：{}", requestData, result);
            mailService.sendMail(MailVo.builder()
                    .to(user.getEmail())
                    .subject(String.format("快递单号 %s (平台订单号 %s )订阅失败",subBean.getTrackingNo(),subBean.getPlatformOrderId()) )
                    .text(String.format("你有快递单号在订阅物流追踪时失败，请检查。失败原因 %s 。详细数据 %s。",result,subBean.toString()))
                    .build());
        }
        return false;
    }

    @Override
    public JSONObject trackQuery(String shipperCode, String logisticCode, String orderCode) {
        String requestData = "{\"OrderCode\": \""+orderCode+"\",\"ShipperCode\": \""+ shipperCode + "\",\"LogisticCode\": \""+ logisticCode +"\"}" ;
        return kdniaoPost(requestData,INSTANT_QUERY,"2");
    }

    private JSONObject kdniaoPost(String requestData, KdNiaoRequestType requestType, String dataType){

        Map<String, String> params = new HashMap<>(16);
        params.put("EBusinessID", EBusinessID);
        params.put("RequestType", requestType.getRequestCode());
        try {
            params.put("RequestData", KdniaoUtil.urlEncoder(requestData, "UTF-8"));
            String dataSign = KdniaoUtil.encrypt(requestData, AppKey, "UTF-8");
            params.put("DataSign", KdniaoUtil.urlEncoder(dataSign, "UTF-8"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        //请求、返回数据类型：2-json；
        params.put("DataType", "2");
        return JSONObject.parseObject(sendPost(requestType.getReqUrl(),params));
    }

    private String sendPost(String url, Map<String, String> params) {
        OutputStreamWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        try {
            URL realUrl = new URL(url);
            HttpURLConnection conn =(HttpURLConnection) realUrl.openConnection();
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // POST方法
            conn.setRequestMethod("POST");
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.connect();
            // 获取URLConnection对象对应的输出流
            out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            // 发送请求参数
            if (params != null) {
                StringBuilder param = new StringBuilder();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    if(param.length()>0){
                        param.append("&");
                    }
                    param.append(entry.getKey());
                    param.append("=");
                    param.append(entry.getValue());
                }
                out.write(param.toString());
            }
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result.toString();
    }

}
