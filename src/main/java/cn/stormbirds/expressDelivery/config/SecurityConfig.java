package cn.stormbirds.expressDelivery.config;


import cn.stormbirds.expressDelivery.filter.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        //校验用户
        auth.userDetailsService( userDetailsService ).passwordEncoder(passwordEncoder());

    }

    /**
     * 装载BCrypt密码编码器
     * @return
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
//        return new Argon2PasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                //因为使用JWT，所以不需要HttpSession
                .sessionManagement()
                .sessionCreationPolicy( SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                //OPTIONS请求全部放行
                .antMatchers( HttpMethod.OPTIONS, "/**").permitAll()
                //登录接口放行
                .antMatchers("/api/v1/login",
                        "/api/v1/sign",
                        "/app/v1/**",
                        "/auth/login",
                        "/auth/register",
                        "/login.html",
                        "/error/**","/**").permitAll()
                //其他接口全部接受验证
                .anyRequest().authenticated();

        //使用自定义的 Token过滤器 验证请求的Token是否合法
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
        http.headers().cacheControl();
    }
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.formLogin()                    //  定义当需要用户登录时候，转到的登录页面。
//                .loginPage("/login.html")           // 设置登录页面
//                .loginProcessingUrl("/auth/login")  // 自定义的登录接口
//                .and()
//                .authorizeRequests()        // 定义哪些URL需要被保护、哪些不需要被保护
//                .antMatchers( HttpMethod.OPTIONS, "/**").permitAll()
//                .antMatchers("/api/v1/login",
//                        "/api/v1/sign",
//                        "/app/v1/**",
//                        "/auth/login",
//                        "/auth/register",
//                        "/login",
//                        "/login.html",
//                        "/error/**").permitAll()     // 设置所有人都可以访问登录页面
//                .anyRequest()               // 任何请求,登录后可以访问
//                .authenticated()
//                .and()
//                .csrf().disable();          // 关闭csrf防护
//    }

    @Override
    public void configure(WebSecurity web) {
        web
                .ignoring()
                .antMatchers(
                        "swagger-ui.html",
                        "**/swagger-ui.html",
                        "login.html",
                        "/favicon.ico",
                        "/**/*.css",
                        "/**/*.js",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.jpg",
                        "/swagger-resources/**",
                        "/v2/**",
                        "/**/*.ttf",
                        "/**/*.woff2",
                        "/**/*.woff"
                );
        web
                .ignoring().antMatchers("/v2/api-docs",
                "/swagger-resources/configuration/ui",
                "/swagger-resources",
                "/swagger-resources/configuration/security",
                "/swagger-ui.html",
                "/app/v1/**",
                "/auth/login",
                "/auth/register",
                "/login"
        );
    }

    @Bean
    public JwtTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JwtTokenFilter();
    }

    /**
     * 允许多请求地址多加斜杠  比如 /msg/list   //msg/list
     * @return
     */
    @Bean
    public HttpFirewall httpFirewall() {
        return new DefaultHttpFirewall();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
