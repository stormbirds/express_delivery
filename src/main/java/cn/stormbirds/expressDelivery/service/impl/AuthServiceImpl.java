package cn.stormbirds.expressDelivery.service.impl;



import cn.stormbirds.expressDelivery.mapper.UserMapper;
import cn.stormbirds.expressDelivery.utils.JwtTokenUtil;
import cn.stormbirds.expressDelivery.service.AuthService;
import cn.stormbirds.expressDelivery.service.GetIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private GetIdService idService;

    @Override
    public String login(String username, String password) {
        UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken( username, password );
        Authentication authentication = authenticationManager.authenticate(upToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername( username );
        return jwtTokenUtil.generateToken(userDetails);
    }

    @Override
    public String register(String username, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(userMapper.save(idService.getId(), username,encoder.encode(password))>0){
            return jwtTokenUtil.generateToken(username);
        }
        return null;
    }


}
