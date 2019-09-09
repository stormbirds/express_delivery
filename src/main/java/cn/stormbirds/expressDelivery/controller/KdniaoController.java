package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.LogisticCodeRecord;
import cn.stormbirds.expressDelivery.entity.LogisticCodeTraces;
import cn.stormbirds.expressDelivery.entity.MailVo;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.*;
import cn.stormbirds.expressDelivery.utils.KdniaoUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
@Api(value = "快递鸟接口控制器", tags = {"快递鸟接口控制器"})
@Slf4j
@RequestMapping(value = "")
@RestController
public class KdniaoController {

    private String AppKey = "f0c1ba54-540c-491f-a18c-8cb01f6346dc";
    @Autowired
    private IExpressTrackingService expressTrackingService;
    @Autowired
    private LogisticsTrackingService logisticsTrackingService;
    @Autowired
    private ILogisticCodeRecordService logisticCodeRecordService;
    @Autowired
    private ILogisticCodeTracesService logisticCodeTracesService;
    @Autowired
    private SendMailService mailService;


    @PostMapping(value = "/app/v1/logisticsTrackingCallBack")
    public String logisticsTrackingCallBack(String RequestData, String RequestType, String DataSign) {
        log.info("接收到物流跟踪推送消息 {} {} {}", RequestData, RequestType, DataSign);
        try {
            log.info("接收到数据是否符合快递鸟安全验证 {} {}", KdniaoUtil.encrypt(RequestData, AppKey, "UTF-8"), KdniaoUtil.encrypt(RequestData, AppKey, "UTF-8").equals(DataSign));
        } catch (Exception e) {
            e.printStackTrace();
        }
        logisticsTrackingService.logisticsTrackinghandle(RequestData, RequestType, DataSign);
        String retStr = "{\"EBusinessID\": \"1575163\",\"UpdateTime\": \"" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\",\"Success\": true,\"Reason\": \"\"}";
        log.info("返回报文 {}", retStr);
        return retStr;
    }

    @ApiOperation(value = "物流跟踪订阅")
    @PostMapping(value = "/app/v1/orderTracesSubByJson")
    public ResultJson orderTracesSubByJson(@RequestBody ExpressTracking subBean) {
        return ResultJson.ok(expressTrackingService.subLogisticsTracking(subBean));
    }

    @ApiOperation(value = "即时查询快递单")
    @PostMapping(value = "/app/v1/trackQuery")
    public ResultJson trackQuery(@RequestParam String shipperCode, @RequestParam String logisticCode) {
        return ResultJson.ok(expressTrackingService.trackQuery(shipperCode, logisticCode, null));
    }

    @ApiOperation(value = "发送邮件")
    @PostMapping(value = "/app/v1/sendMail")
    public ResultJson sendMail(@RequestBody MailVo mailVo) {
        mailService.sendMail(mailVo);
        return ResultJson.ok();
    }

    @PostMapping(value = "/app/v1/queryTrackingRecord")
    public ResultJson queryTrackingRecord(@RequestParam Integer pageNum,
                                          @RequestParam Integer pageSize,
                                          @RequestParam(value = "state") Integer state,
                                          @RequestParam(required = false) String lgisticCode,
                                          @RequestParam(required = false) String shipperCode) {
        return ResultJson.ok(logisticCodeRecordService.page(new Page<>(pageNum, pageSize), Wrappers.<LogisticCodeRecord>lambdaQuery()
                .eq(state != -1, LogisticCodeRecord::getState, state)
                .eq(StringUtils.isNotBlank(lgisticCode), LogisticCodeRecord::getLogisticCode, lgisticCode)
                .eq(StringUtils.isNotBlank(shipperCode), LogisticCodeRecord::getShipperCode, shipperCode)
        ));
    }

    @PostMapping(value = "/app/v1/queryTrackingTraces")
    public ResultJson queryTrackingTraces(@RequestParam Long logisticId) {
        return ResultJson.ok(logisticCodeTracesService.list(Wrappers.<LogisticCodeTraces>lambdaQuery()
                .eq(LogisticCodeTraces::getLogisticId, logisticId)
                .orderByDesc(LogisticCodeTraces::getAcceptTime)));
    }

}
