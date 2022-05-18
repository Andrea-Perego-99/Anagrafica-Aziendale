package anagrafica.aziendale.loginregistrazione;

import anagrafica.aziendale.loginregistrazione.model.AppUser;
import anagrafica.aziendale.loginregistrazione.model.Endpoint;
import anagrafica.aziendale.loginregistrazione.model.Role;
import anagrafica.aziendale.loginregistrazione.repository.AppUserRepository;
import anagrafica.aziendale.loginregistrazione.repository.EndopointRepository;
import anagrafica.aziendale.loginregistrazione.repository.RoleRepository;
import anagrafica.aziendale.loginregistrazione.securityConfig.CustomPasswordEncoder;
import anagrafica.aziendale.loginregistrazione.service.util.PasswordGen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class LoginRegistrazioneApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(LoginRegistrazioneApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
    }
}
