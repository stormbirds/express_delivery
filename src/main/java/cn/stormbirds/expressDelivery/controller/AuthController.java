package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.entity.SysUser;
import cn.stormbirds.expressDelivery.response.ResultCode;
import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.ISysUserService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * <p>
 * cn.stormbirds.express_delivery.controller
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 16:46
 */

@RestController
public class AuthController {


    @Autowired
    private ISysUserService sysUserService;

    /**
     * 登录
     */
    @PostMapping(value = "/auth/login")
    public ResultJson login( String username,String password )  {
        SysUser user = sysUserService.getOne(Wrappers.<SysUser>lambdaQuery().eq(SysUser::getUsername,username));
        if(user==null){
            ResultJson.failure(ResultCode.UNAUTHORIZED,"未找到该用户");
        }
//        if(user.getPassword().equals(passwordEncoder.encode(password))){
//            return  ResultJson.ok();
//        }
        return ResultJson.failure(ResultCode.UNAUTHORIZED,"用户名密码错误");
    }

//    @PostMapping(value = "/auth/register")
//    public ResultJson register(String username, String password){
//        return ResultJson.ok(authService.register( username, password )) ;
//    }

    @RequestMapping(value = "/")
    public ModelAndView index(){
        ModelAndView modelAndView = new ModelAndView("index.html");
        return modelAndView;
    }

}
