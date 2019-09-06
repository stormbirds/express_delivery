package cn.stormbirds.expressDelivery.controller;

import cn.stormbirds.expressDelivery.response.ResultJson;
import cn.stormbirds.expressDelivery.service.AuthService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
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
    private AuthService authService;


    /**
     * 登录
     */
    @PostMapping(value = "/auth/login")
    public String login( String username,String password ) throws AuthenticationException {
        // 登录成功会返回Token给用户
        return authService.login( username, password );
    }

    @PostMapping(value = "/auth/register")
    public ResultJson register(String username, String password){
        return ResultJson.ok(authService.register( username, password )) ;
    }

}
