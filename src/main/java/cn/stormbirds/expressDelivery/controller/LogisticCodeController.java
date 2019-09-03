package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.response.ResultJson;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 * cn.stormbirds.expressDelivery.controller
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 19:04
 */

@RestController
@RequestMapping(value = "/api/v1")
public class LogisticCodeController {

    @PostMapping(value = "/importByExcel")
    public ResultJson importByExcel(@RequestParam("logisticCode") MultipartFile logisticCode){
        return ResultJson.ok();
    }
}
