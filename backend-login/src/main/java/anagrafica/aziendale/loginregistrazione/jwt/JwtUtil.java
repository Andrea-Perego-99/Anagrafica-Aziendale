package anagrafica.aziendale.loginregistrazione.jwt;

import anagrafica.aziendale.loginregistrazione.model.Endpoint;
import anagrafica.aziendale.loginregistrazione.repository.RoleRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Component @NoArgsConstructor
public class JwtUtil {

    @Autowired
    private RoleRepository roleRepository;

    @Value("${anagrafica.aziendale.app.key}")
    private String key;

    @Value("${anagrafica.aziendale.app.jwtExpiration}")
    private int timeValid;  //minuti

    public final Integer FORBIDDEN = 403;
    public final Integer OK = 200;


    public String createToken(Authentication authResult){

        return Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities", authResult.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + timeValid))
                .signWith(SignatureAlgorithm.HS512, Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }

    protected boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(key.getBytes())).parseClaimsJws(token);
            return true;
        }catch (Exception e){
            throw  new RuntimeException("Token invalid or Expired", e);
        }
    }

    protected String resolve(HttpServletRequest request){

        String authorizationHeader = request.getHeader("Authorization");

        if(authorizationHeader != null) {
            if (!authorizationHeader.isEmpty() || authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.replace("Bearer ", "");
            }
        }
        return null;
    }

    protected Authentication getAuthentication(String token){

        Claims body = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(key.getBytes())).parseClaimsJws(token).getBody();

        String username =body.getSubject();
        var authorities = (List<Map<String, String>>) body.get("authorities");

        Set<SimpleGrantedAuthority> authority = authorities.stream()
                .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                .collect(Collectors.toSet());

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                username,
                null,
                authority
        );

        return authentication;
    }

    protected boolean Check(Authentication auth, String path){

        if(auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_SUPERADMIN"))){
            Collection<Endpoint> endpoint = roleRepository.findByName("ROLE_SUPERADMIN").get().getEndpoints();
            if (endpoint.stream().anyMatch(endPo -> path.startsWith(endPo.getPath()))) {
                return true;
            }
        }

        if(auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            Collection<Endpoint> endpoint = roleRepository.findByName("ROLE_ADMIN").get().getEndpoints();
            if (endpoint.stream().anyMatch(endPo -> path.startsWith(endPo.getPath()))) {
                return true;
            }
        }

        if(auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER"))){
            Collection<Endpoint> endpoint = roleRepository.findByName("ROLE_USER").get().getEndpoints();
            return endpoint.stream().anyMatch(endPo -> path.startsWith(endPo.getPath()));
        }

        return false;

    }

}
