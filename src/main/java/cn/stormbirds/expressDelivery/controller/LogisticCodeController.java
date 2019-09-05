package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.entity.AuthUser;
import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.LogisticCodeBean;
import cn.stormbirds.expressDelivery.response.ResultCode;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.IExpressTrackingService;
import cn.stormbirds.expressDelivery.utils.ExcelUtils;
import cn.stormbirds.expressDelivery.utils.SysUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 * cn.stormbirds.expressDelivery.controller
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 19:04
 */
@Api(value = "快递订单处理控制器",tags = {"快递订单处理控制器"})
@RestController
@RequestMapping(value = "/app/v1")
public class LogisticCodeController {

    @Autowired
    private IExpressTrackingService expressTrackingService;

    @ApiOperation(value = "通过excel文件导入快递订单")
    @PostMapping(value = "/importLogisticsCodeByExcel")
    public ResultJson importLogisticsCodeByExcel(@RequestParam(value = "file")MultipartFile file){
        AuthUser user = SysUtil.getCurrentUser();
        if(user==null){
            throw new IllegalArgumentException("未找到用户");
        }
        return ResultJson.ok(expressTrackingService.importByExcel(file, user.getId()));

    }
}
