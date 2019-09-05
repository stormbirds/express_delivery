package cn.stormbirds.expressDelivery.service.impl;

import cn.stormbirds.expressDelivery.entity.*;
import cn.stormbirds.expressDelivery.service.*;
import cn.stormbirds.expressDelivery.utils.KdniaoUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static cn.stormbirds.expressDelivery.utils.CommonParameters.TRACKING_STATUS_RECORD;
import static cn.stormbirds.expressDelivery.utils.CommonParameters.TRACKING_STATUS_RUNNING;

/**
 * <p>
 * cn.stormbirds.express_delivery.service.impl
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 18:49
 */
@Slf4j
@Service
public class LogisticsTrackingServiceImpl implements LogisticsTrackingService {

    @Autowired
    private GetIdService idService;
    @Autowired
    private ILogisticCodeRecordService logisticCodeRecordService;
    @Autowired
    private ILogisticCodeTracesService logisticCodeTracesService;


    /**
     * 订阅消息处理
     *
     * @param requestData
     * @param requestType
     * @param dataSign
     */
    @Async("asyncPoolTaskExecutor")
    @Override
    public void logisticsTrackinghandle(String requestData, String requestType, String dataSign) {
        if ("101".equals(requestType)) {
            LogisticsTrackingTrailBean trailBean = JSONObject.parseObject(requestData, LogisticsTrackingTrailBean.class);
            if (trailBean != null && Integer.valueOf(trailBean.getCount()) > 0) {
                trailBean.getData().forEach(dataBean -> {
                    //TODO 这里push消息给管理员，提醒快递状态改变
                    if (dataBean.getReason() != null && !dataBean.getReason().isEmpty()) {
                        //TODO 这里说明该快递有问题，需要push消息给管理员
                    }
                    final Long logisticId;
                    LogisticCodeRecord logisticCodeRecordTmp = logisticCodeRecordService.getOne(Wrappers.<LogisticCodeRecord>lambdaQuery()
                            .eq(LogisticCodeRecord::getLogisticCode, dataBean.getLogisticCode())
                            .eq(LogisticCodeRecord::getShipperCode, dataBean.getShipperCode()));
                    if (logisticCodeRecordTmp != null) {
                        //说明是物流状态更新
                        logisticId = logisticCodeRecordTmp.getId();
                    } else {
                        //说明是第一次收到状态改变信息
                        logisticId = idService.getId();
                    }
                    LogisticCodeRecord logisticCodeRecord = LogisticCodeRecord.builder()
                            .logisticCode(dataBean.getLogisticCode())
                            .id(logisticId)
                            .shipperCode(dataBean.getShipperCode())
                            .callback(dataBean.getCallBack())
                            .eBusinessId(dataBean.getEBusinessID())
                            .estimatedDeliveryTime(LocalDateTime.parse(dataBean.getEstimatedDeliveryTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                            .reason(dataBean.getReason())
                            .state(Integer.valueOf(dataBean.getState()))
                            .success(dataBean.isSuccess()).build();
                    //更新此订单状态记录
                    dataBean.getTraces().forEach(tracesBean -> {
                        LocalDateTime acceptTime = LocalDateTime.parse(tracesBean.getAcceptTime().length() == "yyyy-MM-dd HH:mm:sss".length() ?
                                tracesBean.getAcceptTime().substring(0, tracesBean.getAcceptTime().length() - 1) :
                                tracesBean.getAcceptTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                        LogisticCodeTraces logisticCodeTraces = LogisticCodeTraces.builder()
                                .logisticId(logisticId)
                                .acceptStation(tracesBean.getAcceptStation())
                                .acceptTime(acceptTime)
//                                .id(idService.getId())
                                .remark(tracesBean.getRemark())
                                .build();
                        logisticCodeTracesService.saveOrUpdate(logisticCodeTraces, Wrappers.<LogisticCodeTraces>lambdaUpdate()
                                .eq(LogisticCodeTraces::getLogisticId, logisticId)
                                .eq(LogisticCodeTraces::getAcceptTime, acceptTime));

                    });
                    logisticCodeRecordService.saveOrUpdate(logisticCodeRecord);
                });

            }

        } else if ("107".equals(requestType)) {
            //货款状态（RequestType：107）
            //用户通过电子面单使用快递鸟货到付款等金融服务时，快递鸟会将该订单的金融状态通过接口推送给用户。
        }
    }

}
