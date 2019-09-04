package cn.stormbirds.expressDelivery.utils;

import cn.stormbirds.expressDelivery.entity.AuthUser;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>
 * cn.stormbirds.expressDelivery.utils
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/4 15:42
 */


public class SysUtil {
    public static AuthUser getCurrentUser(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return (AuthUser)request.getAttribute("user");
    }
}
