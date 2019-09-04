package cn.stormbirds.expressDelivery.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * <p>
 * cn.stormbirds.expressDelivery.config
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/4 16:48
 */

@Configuration
public class CommonConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
