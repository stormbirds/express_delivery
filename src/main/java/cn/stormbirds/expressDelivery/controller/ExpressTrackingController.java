package cn.stormbirds.expressDelivery.controller;


import cn.stormbirds.expressDelivery.base.BaseController;
import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.LogisticCodeRecord;
import cn.stormbirds.expressDelivery.response.ResultCode;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.IExpressTrackingService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
@Api(value = "",tags = {"已导入快递单控制器"})
@RestController
@RequestMapping("/app/v1")
public class ExpressTrackingController extends BaseController {
    @Autowired
    private IExpressTrackingService expressTrackingService;

    @ApiOperation(value = "" ,tags = {"查询已导入快递单"})
    @PostMapping(value = "/queryExpressTrackingRecord")
    public ResultJson queryTrackingRecord(@RequestParam Integer pageNum,
                                          @RequestParam Integer pageSize,
                                          @RequestParam(required = false) String platformId,
                                          @RequestParam(required = false) String platformOrderId,
                                          @RequestParam(required = false) String itemTitle,
                                          @RequestParam(required = false) String receiverName,
                                          @RequestParam(required = false) String receiverPhone,
                                          @RequestParam(required = false) String receiverProvince,
                                          @RequestParam(required = false) String receiverCity,
                                          @RequestParam(required = false) String receiverArea,
                                          @RequestParam(required = false) String receiverAddress,
                                          @RequestParam(required = false) String itemNum,
                                          @RequestParam(required = false) String trackingNo,
                                          @RequestParam(required = false) String shipperCode,
                                          @RequestParam(required = false) String trackingStatus,
                                          @RequestParam(required = false) String logisticStatus) {
        return ResultJson.ok(expressTrackingService.page(new Page<>(pageNum, pageSize), Wrappers.<ExpressTracking>lambdaQuery()
                .eq(StringUtils.isNotBlank(platformId), ExpressTracking::getPlatformId, platformId)
                .eq(StringUtils.isNotBlank(platformOrderId), ExpressTracking::getPlatformOrderId, platformOrderId)
                .eq(StringUtils.isNotBlank(itemTitle), ExpressTracking::getItemTitle, itemTitle)
                .like(StringUtils.isNotBlank(receiverName), ExpressTracking::getReceiverName, receiverName)
                .eq(StringUtils.isNotBlank(receiverPhone), ExpressTracking::getReceiverPhone, receiverPhone)
                .eq(StringUtils.isNotBlank(receiverProvince), ExpressTracking::getReceiverProvince, receiverProvince)
                .eq(StringUtils.isNotBlank(receiverCity), ExpressTracking::getReceiverCity, receiverCity)
                .eq(StringUtils.isNotBlank(receiverArea), ExpressTracking::getReceiverArea, receiverArea)
                .like(StringUtils.isNotBlank(receiverAddress), ExpressTracking::getReceiverAddress, receiverAddress)
                .eq(StringUtils.isNotBlank(itemNum), ExpressTracking::getItemNum, itemNum)
                .eq(StringUtils.isNotBlank(trackingNo), ExpressTracking::getTrackingNo, trackingNo)
                .eq(StringUtils.isNotBlank(shipperCode), ExpressTracking::getShipperCode, shipperCode)
                .eq(StringUtils.isNotBlank(trackingStatus), ExpressTracking::getTrackingStatus, trackingStatus)
                .eq(StringUtils.isNotBlank(logisticStatus), ExpressTracking::getLogisticStatus, logisticStatus)
        ));
    }

    @ApiOperation(value = "" ,tags = {"编辑已导入快递单"})
    @PostMapping("/editExpressTrackingRecord")
    public ResultJson editExpressTrackingRecord(@RequestParam String id,
            @RequestParam(required = false) String platformId,
                                                @RequestParam(required = false) String platformOrderId,
                                                @RequestParam(required = false) String itemTitle,
                                                @RequestParam(required = false) String receiverName,
                                                @RequestParam(required = false) String receiverPhone,
                                                @RequestParam(required = false) String receiverProvince,
                                                @RequestParam(required = false) String receiverCity,
                                                @RequestParam(required = false) String receiverArea,
                                                @RequestParam(required = false) String receiverAddress,
                                                @RequestParam(required = false) String itemNum,
                                                @RequestParam(required = false) String trackingNo,
                                                @RequestParam(required = false) String shipperCode,
                                                @RequestParam(required = false) String trackingStatus,
                                                @RequestParam(required = false) String logisticStatus){
        if(expressTrackingService.updateById(ExpressTracking.builder()
                .id(Long.valueOf(id))
                .platformId(StringUtils.isNotBlank(platformId)? Long.valueOf(platformId) :null)
                .platformOrderId(StringUtils.isNotBlank(platformOrderId)? platformOrderId :null)
                .itemTitle(StringUtils.isNotBlank(itemTitle)? itemTitle :null)
                .receiverName(StringUtils.isNotBlank(receiverName)? receiverName :null)
                .receiverPhone(StringUtils.isNotBlank(receiverPhone)? receiverPhone :null)
                .receiverProvince(StringUtils.isNotBlank(receiverProvince)? receiverProvince :null)
                .receiverCity(StringUtils.isNotBlank(receiverCity)? receiverCity :null)
                .receiverArea(StringUtils.isNotBlank(receiverArea)? receiverArea :null)
                .receiverAddress(StringUtils.isNotBlank(receiverAddress)? receiverAddress :null)
                .itemNum(StringUtils.isNotBlank(itemNum)? Integer.valueOf(itemNum) :null)
                .trackingNo(StringUtils.isNotBlank(trackingNo)? trackingNo :null)
                .shipperCode(StringUtils.isNotBlank(shipperCode)? shipperCode :null)
                .trackingStatus(StringUtils.isNotBlank(trackingStatus)? Integer.valueOf(trackingStatus) :null)
                .logisticStatus(StringUtils.isNotBlank(logisticStatus)? Integer.valueOf(logisticStatus) :null)
                .build())){
            return ResultJson.ok();
        }
        return ResultJson.failure(ResultCode.BAD_REQUEST,"参数错误");
    }
}
