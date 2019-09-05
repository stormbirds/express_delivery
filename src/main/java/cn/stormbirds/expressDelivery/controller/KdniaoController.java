package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.IExpressTrackingService;
import cn.stormbirds.expressDelivery.service.LogisticsTrackingService;
import cn.stormbirds.expressDelivery.utils.KdniaoUtil;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * <p>
 * 物流订单推送接受控制器
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 14:29
 */
@Api(value = "快递鸟接口控制器",tags = {"快递鸟接口控制器"})
@Slf4j
@RequestMapping(value = "")
@RestController
public class KdniaoController {

    private String AppKey = "f0c1ba54-540c-491f-a18c-8cb01f6346dc";
    @Autowired
    private IExpressTrackingService expressTrackingService;
    @Autowired
    private LogisticsTrackingService logisticsTrackingService;

    @PostMapping(value = "/app/v1/logisticsTrackingCallBack")
    public String logisticsTrackingCallBack(String RequestData, String RequestType, String DataSign) {
        log.info("接收到物流跟踪推送消息 {} {} {}", RequestData, RequestType, DataSign);
        try {
            log.info("接收到数据是否符合快递鸟安全验证 {} {}",  KdniaoUtil.encrypt(RequestData, AppKey, "UTF-8"), KdniaoUtil.encrypt(RequestData, AppKey, "UTF-8").equals(DataSign));
        } catch (Exception e) {
            e.printStackTrace();
        }
        logisticsTrackingService.logisticsTrackinghandle(RequestData,RequestType,DataSign);
        String retStr = "{\"EBusinessID\": \"1575163\",\"UpdateTime\": \"" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\",\"Success\": true,\"Reason\": \"\"}";
        log.info("返回报文 {}", retStr);
        return retStr;
    }

    @PostMapping(value = "/app/v1/orderTracesSubByJson")
    public ResultJson orderTracesSubByJson(@RequestBody ExpressTracking subBean){
        return ResultJson.ok(expressTrackingService.subLogisticsTracking(subBean));
    }

    @PostMapping(value = "/app/v1/trackQuery")
    public ResultJson trackQuery(@RequestParam String shipperCode,@RequestParam String logisticCode){
        return ResultJson.ok(expressTrackingService.trackQuery(shipperCode,logisticCode,null));
    }

}
