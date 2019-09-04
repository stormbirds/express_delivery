package cn.stormbirds.expressDelivery.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * <p>
 * cn.stormbirds.expressDelivery.config
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/4 18:49
 */

@EnableTransactionManagement
@Configuration
@MapperScan("cn.stormbirds.expressDelivery.mapper")
public class MybatisPlusConfig {

    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
