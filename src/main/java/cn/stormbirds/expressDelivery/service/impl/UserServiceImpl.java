package cn.stormbirds.expressDelivery.service.impl;

import cn.stormbirds.expressDelivery.entity.User;
import cn.stormbirds.expressDelivery.mapper.UserMapper;
import cn.stormbirds.expressDelivery.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
