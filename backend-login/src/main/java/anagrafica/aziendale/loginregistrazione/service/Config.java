package anagrafica.aziendale.loginregistrazione.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class Config {

    @Bean
    public RestTemplate getRestTemplete(){
        return new RestTemplate();
    }

}
