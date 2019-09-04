package cn.stormbirds.expressDelivery.service.impl;



import cn.stormbirds.expressDelivery.entity.AuthUser;
import cn.stormbirds.expressDelivery.entity.Role;
import cn.stormbirds.expressDelivery.mapper.RoleMapper;
import cn.stormbirds.expressDelivery.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;

    @Override
    public AuthUser loadUserByUsername(String userName) throws UsernameNotFoundException {
        //查数据库
        AuthUser authUser = userMapper.loadUserByUsername( userName );
        if (null != authUser) {
            List<Role> roles = roleMapper.getRolesByUserId( authUser.getId() );
            authUser.setAuthorities( roles );
        }
        return authUser;
    }
}
