package anagrafica.aziendale.loginregistrazione.jwt;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@AllArgsConstructor
public class JwtVerifier extends OncePerRequestFilter {

    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        final HttpServletResponse resp = (HttpServletResponse) response;
        String token = jwtUtil.resolve(request);

        String path;

        if (request.getServletPath().equals("/security/SecurityEndpoint")){
            path = request.getHeader("Path");
        }else{
            path = request.getServletPath();
        }


        try {
            if (token != null && jwtUtil.validateToken(token)) {
                Authentication authentication = jwtUtil.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                if (jwtUtil.Check(authentication, path)) {
                    resp.setStatus(jwtUtil.OK);
                    String emailAuth = authentication.getName();
                    response.setHeader("applicantUser", emailAuth);
                    request.setAttribute("applicantUser", emailAuth);
                    filterChain.doFilter(request, response);
                } else {
                    System.out.println(path);
                    logger.error("ERRORE SUI RUOLI o PATH");
                    resp.setStatus(jwtUtil.FORBIDDEN);
                }

            } else {
                logger.error("ERRORE SUL TOKEN ");
                resp.setStatus(jwtUtil.FORBIDDEN);
            }

        } catch (Exception e) {
            logger.error("EXCEPTION SUL TOKEN " + e);
            resp.setStatus(jwtUtil.FORBIDDEN);
        }

    }

}
