package cn.stormbirds.expressDelivery.controller;


import cn.stormbirds.expressDelivery.base.BaseController;
import cn.stormbirds.expressDelivery.entity.LogisticCodeRecord;
import cn.stormbirds.expressDelivery.entity.LogisticCodeTraces;
import cn.stormbirds.expressDelivery.response.ResultCode;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.ILogisticCodeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
@RestController
@RequestMapping("/app/v1")
public class LogisticCodeRecordController extends BaseController {

    @Autowired
    private ILogisticCodeRecordService logisticCodeRecordService;

    @PostMapping(value = "/updateTrackingRecord")
    public ResultJson updateTrackingRecord(@RequestParam String id,
                                           @RequestParam String logisticCode,
                                           @RequestParam String shipperCode,
                                           @RequestParam Integer state,
                                           @RequestParam String eBusinessId,
                                           @RequestParam Boolean success,
                                           @RequestParam String reason,
                                           @RequestParam String callback,
                                           @RequestParam String estimatedDeliveryTime){
        LogisticCodeRecord logisticCodeRecord = new LogisticCodeRecord(Long.valueOf(id) ,
                logisticCode,shipperCode,state,eBusinessId,
                success,reason,callback,LocalDateTime.parse(estimatedDeliveryTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) );
        if(logisticCodeRecordService.updateById(logisticCodeRecord)){
            return ResultJson.ok("保存成功");
        }
        return ResultJson.failure(ResultCode.BAD_REQUEST,"保存失败");
    }
}
