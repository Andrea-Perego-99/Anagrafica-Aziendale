package anagrafica.aziendale.loginregistrazione.service.util;

import anagrafica.aziendale.loginregistrazione.model.AppUser;
import anagrafica.aziendale.loginregistrazione.model.Endpoint;
import anagrafica.aziendale.loginregistrazione.model.Role;
import anagrafica.aziendale.loginregistrazione.repository.AppUserRepository;
import anagrafica.aziendale.loginregistrazione.repository.EndopointRepository;
import anagrafica.aziendale.loginregistrazione.repository.RoleRepository;
import anagrafica.aziendale.loginregistrazione.securityConfig.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.util.Arrays;

// SOLO PER DEMO LOCALE
@Component
public class Init {

    @Autowired
    private RoleRepository repository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private CustomPasswordEncoder passwordEncoder;
    @Autowired
    private EndopointRepository endopointRepository;

    @PostConstruct
    public void init(){

        if (!repository.findByName("ROLE_USER").isPresent()) {
            repository.save(new Role("ROLE_USER"));
        }

        if (!repository.findByName("ROLE_ADMIN").isPresent()) {
            repository.save(new Role("ROLE_ADMIN"));
        }

        if (!repository.findByName("ROLE_SUPERADMIN").isPresent()) {
            repository.save(new Role("ROLE_SUPERADMIN"));
        }

        if (!appUserRepository.findByEmail("admin.root@certimeter.it").isPresent()) {
            AppUser appUser = new AppUser();
            appUser.setEmail("admin.root@certimeter.it");
            appUser.setPassword(passwordEncoder.encode("1234"));
            appUser.setEnabled(true);
            appUser.setRoles(Arrays.asList(repository.findByName("ROLE_ADMIN").orElse(null),
                    repository.findByName("ROLE_SUPERADMIN").orElse(null),
                    repository.findByName("ROLE_USER").orElse(null)));
            appUserRepository.save(appUser);
        }

        if (!appUserRepository.findByEmail("admin.admin@certimeter.it").isPresent()) {
            AppUser appUser = new AppUser();
            appUser.setEmail("admin.admin@certimeter.it");
            appUser.setPassword(passwordEncoder.encode("1234"));
            appUser.setEnabled(true);
            appUser.setRoles(Arrays.asList(repository.findByName("ROLE_ADMIN").orElse(null),
                    repository.findByName("ROLE_USER").orElse(null)));
            appUserRepository.save(appUser);
        }

        if (endopointRepository.findByPath("/control/person").isEmpty()) {
            Endpoint endpoint = new Endpoint();
            endpoint.setPath("/control/person");
            endopointRepository.save(endpoint);
        }

        if (endopointRepository.findByPath("/control/admin").isEmpty()) {
            Endpoint endpoint = new Endpoint();
            endpoint.setPath("/control/admin");
            endopointRepository.save(endpoint);
        }

        if (endopointRepository.findByPath("/securitySuper").isEmpty()) {
            Endpoint endpoint = new Endpoint();
            endpoint.setPath("/securitySuper");
            endopointRepository.save(endpoint);
        }

        if (endopointRepository.findByPath("/security").isEmpty()) {
            Endpoint endpoint = new Endpoint();
            endpoint.setPath("/security");
            endopointRepository.save(endpoint);
        }

        if (endopointRepository.findByPath("/securityU").isEmpty()) {
            Endpoint endpoint = new Endpoint();
            endpoint.setPath("/securityU");
            endopointRepository.save(endpoint);
        }


        Endpoint endpoint = endopointRepository.findByPath("/control/person").get();
        Role role = repository.findByName("ROLE_USER").get();
        if (role.getEndpoints().isEmpty()) {
            role.getEndpoints().add(endpoint);
            Endpoint endpoint3 = endopointRepository.findByPath("/securityU").get();
            role.getEndpoints().add(endpoint3);
            repository.save(role);
        }

        Endpoint endpoint2 = endopointRepository.findByPath("/control/admin").get();
        Role role1 = repository.findByName("ROLE_ADMIN").get();
        if (role1.getEndpoints().isEmpty()) {
            role1.getEndpoints().add(endpoint2);
            Endpoint endpoint3 = endopointRepository.findByPath("/security").get();
            role1.getEndpoints().add(endpoint3);
            repository.save(role1);
        }

        Endpoint endpoint4 = endopointRepository.findByPath("/securitySuper").get();
        Role role2 = repository.findByName("ROLE_SUPERADMIN").get();
        if (role2.getEndpoints().isEmpty()) {
            role2.getEndpoints().add(endpoint4);
            repository.save(role2);
        }
    }
}
