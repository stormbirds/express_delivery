package cn.stormbirds.expressDelivery.controller;


import cn.stormbirds.expressDelivery.base.BaseController;
import cn.stormbirds.expressDelivery.entity.LogisticCodeTraces;
import cn.stormbirds.expressDelivery.response.ResultCode;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.ILogisticCodeTracesService;
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
@RestController
@RequestMapping("/app/v1")
public class LogisticCodeTracesController extends BaseController {

    @Autowired
    private ILogisticCodeTracesService logisticCodeTracesService;


}
