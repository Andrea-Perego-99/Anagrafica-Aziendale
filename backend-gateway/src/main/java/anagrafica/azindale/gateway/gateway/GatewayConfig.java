package anagrafica.azindale.gateway.gateway;


import anagrafica.azindale.gateway.filter.CustomFilter;
import lombok.AllArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration @AllArgsConstructor
public class GatewayConfig {

    private CustomFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes().route("backend_security", r -> r.path("/security/**", "/securityU/**", "/securitySuper/**").uri("http://securityB:8081"))
                .route("backend_security", r -> r.path("/login").uri("http://securityB:8081"))
                .route("backend_user", r -> r.path("/control/**").filters(f -> f.filter(filter)).uri("http://usersB:8082")).build();;
    }

}
