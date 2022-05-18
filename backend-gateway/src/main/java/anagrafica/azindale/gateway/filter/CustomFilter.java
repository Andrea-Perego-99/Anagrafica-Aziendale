package anagrafica.azindale.gateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

;

@Component
public class CustomFilter implements GatewayFilter {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = (ServerHttpRequest) exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();


        if (!request.getHeaders().containsKey("Authorization")) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        String token = request.getHeaders().getOrEmpty("Authorization").get(0);
        String path = request.getPath().toString();

        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setContentType(MediaType.APPLICATION_JSON);
        requestHeader.set("Authorization", token);
        requestHeader.set("Path", path);

        HttpEntity<String> entityReq = new HttpEntity<>("parameters", requestHeader);
        try {
            ResponseEntity<String> result = restTemplate.exchange("http://localhost:8081/securityU/SecurityEndpoint",
//            ResponseEntity<String> result = restTemplate.exchange("http://securityB:8081/securityU/SecurityEndpoint",
                    HttpMethod.GET,
                    entityReq,
                    String.class);

            if (result.getStatusCode() == HttpStatus.OK) {
                request.mutate().header("applicantUser", result.getHeaders().getFirst("applicantUser")).build();
                return chain.filter(exchange);
            } else {
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();
            }
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }
    }
}
