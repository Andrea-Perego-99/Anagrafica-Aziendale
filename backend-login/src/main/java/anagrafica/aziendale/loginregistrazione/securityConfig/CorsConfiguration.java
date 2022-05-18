package anagrafica.aziendale.loginregistrazione.securityConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
                        .allowedHeaders("")
                        .allowedMethods("GET","PUT", "POST", "DELETE", "HEAD", "PATCH")
                        .allowedOriginPatterns("*")
                        .allowCredentials(true);
            }
        };
    }
}
