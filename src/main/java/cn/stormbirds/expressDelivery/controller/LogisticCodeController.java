package cn.stormbirds.expressDelivery.controller;


import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.SysUser;
import cn.stormbirds.expressDelivery.response.ResultCode;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.AsyncSubMethod;
import cn.stormbirds.expressDelivery.service.IExpressTrackingService;
import cn.stormbirds.expressDelivery.service.ISysUserService;
import cn.stormbirds.expressDelivery.utils.SysUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
@Api(value = "快递订单处理控制器", tags = {"快递订单处理控制器"})
@RestController
@RequestMapping(value = "/app/v1")
public class LogisticCodeController {

    private final IExpressTrackingService expressTrackingService;
    private final AsyncSubMethod subMethod;
@Autowired
private ISysUserService userService;
    @Autowired
    public LogisticCodeController(IExpressTrackingService expressTrackingService, AsyncSubMethod subMethod) {
        this.expressTrackingService = expressTrackingService;
        this.subMethod = subMethod;
    }

    @ApiOperation(value = "通过excel文件导入快递订单")
    @PostMapping(value = "/importLogisticsCodeByExcel")
    public ResultJson importLogisticsCodeByExcel(@RequestParam(value = "file") MultipartFile file) {

        SysUser user = userService.getOne(Wrappers.<SysUser>lambdaQuery().eq(SysUser::getUsername,"admin"));
        if (user == null) {
            return ResultJson.failure(ResultCode.UNAUTHORIZED);
        }

        List<ExpressTracking> listImport = expressTrackingService.importByExcel(file, user.getId());
        if (listImport != null) {
            subMethod.subLogisticsTracking(listImport);
            return ResultJson.ok(listImport);
        }
        return ResultJson.failure(ResultCode.SERVER_ERROR);

    }
}
