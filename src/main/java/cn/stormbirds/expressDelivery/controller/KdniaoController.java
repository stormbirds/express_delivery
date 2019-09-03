package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.utils.KdniaoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
@Slf4j
@RequestMapping(value = "/app/v1")
@RestController
public class KdniaoController {

    private String AppKey = "f0c1ba54-540c-491f-a18c-8cb01f6346dc";

    @PostMapping(value = "/logisticsTrackingCallBack")
    public String logisticsTrackingCallBack(String RequestData, String RequestType, String DataSign) {
        log.info("接收到物流跟踪推送消息 {} {} {}", RequestData, RequestType, DataSign);
        try {
            log.info("接收到数据是否符合快递鸟安全验证 {} {}", KdniaoUtil.encrypt(RequestData, AppKey, "UTF-8"), KdniaoUtil.encrypt(RequestData, AppKey, "UTF-8").equals(DataSign));
        } catch (Exception e) {
            e.printStackTrace();
        }
        String retStr = "{\"EBusinessID\": \"1575163\",\"UpdateTime\": \"" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\",\"Success\": true,\"Reason\": \"\"}";
        log.info("返回报文 {}", retStr);
        return retStr;
    }

}
