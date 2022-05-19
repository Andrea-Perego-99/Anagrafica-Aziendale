package anagrafica.aziendale.loginregistrazione.service;

import anagrafica.aziendale.loginregistrazione.model.AppUser;
import anagrafica.aziendale.loginregistrazione.model.DTO.AppUserDTO;
import anagrafica.aziendale.loginregistrazione.model.DTO.PersonDTO;
import anagrafica.aziendale.loginregistrazione.model.Role;
import anagrafica.aziendale.loginregistrazione.repository.AppUserRepository;
import anagrafica.aziendale.loginregistrazione.repository.RoleRepository;
import anagrafica.aziendale.loginregistrazione.securityConfig.CustomPasswordEncoder;
import anagrafica.aziendale.loginregistrazione.service.util.EmailSender;
import anagrafica.aziendale.loginregistrazione.service.util.PasswordGen;
import lombok.AllArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

@Service("UserDetailsService") @AllArgsConstructor
@Transactional
public class DetailService implements UserDetailsService {

    private final RoleRepository roleRepository;
    private CustomPasswordEncoder passwordEncoder;
    private final AppUserRepository userRepository;
    private EmailSender emailSender;
    private PasswordGen passwordGen;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        return new User(appUser.getEmail(), appUser.getPassword(), appUser.isEnabled(),
                true, true, true, /*getAuthorities(appUser.getRoles())*/ getAuthorities(appUser) );
    }


    private Collection<SimpleGrantedAuthority> getAuthorities(AppUser appUser){
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        appUser.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });

        return authorities;

    }

    public void registration(AppUserDTO appUserDTO, String admin) {

        if(userRepository.findByEmail(appUserDTO.getEmail()).isPresent() && !checkAdmin(admin)){
            throw new RuntimeException("Email already present");
        }

        communicationRegistration(appUserDTO.getEmail());
        String password = passwordGen.Gen();

        AppUser appUser = new AppUser();
        appUser.setEmail(appUserDTO.getEmail());
        appUser.setPassword(passwordEncoder.encode(password));
        appUser.setEnabled(true);
        appUser.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER").orElse(null)));

        emailSender.sendEmail(appUser.getEmail(), password);
        userRepository.save(appUser);
    }

    public void disableEnable(PersonDTO personDTO, String admin) {
        AppUser appUser = userRepository.findByEmail(personDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if(checkAdmin(admin) && !checkAdmin(personDTO.getEmail())){
            communicationEnableDisable(personDTO.getEmail(), personDTO.getEnable());
            appUser.setEnabled(personDTO.getEnable());
            userRepository.save(appUser);
        }else{
            throw new RuntimeException("Admin can not disable an admin");
        }
    }

    public void update(PersonDTO personDTO, String admin){
        AppUser appUser = userRepository.findByEmail(personDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        Role role = roleRepository.findByName("ROLE_" + personDTO.getAuthority())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        if(!checkAdmin(appUser.getEmail()) && checkAdmin(admin)) {
            communicationUpdate(personDTO.getEmail(), personDTO.getSalary(), personDTO.getPosizione(), personDTO.getAuthority());

            if (appUser.getRoles().stream().noneMatch(fun -> fun.getName().equals(role.getName()))) {
                appUser.addRole(role);
                userRepository.save(appUser);
            }
        }else{
            throw new RuntimeException("admin cannot delete admin");
        }
    }

    public void deleteUser(String email, String admin) {
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if(!checkAdmin(appUser.getEmail()) && checkAdmin(admin) && !checkSuperUser(appUser.getEmail())){
            communicationDelete(email);
            userRepository.delete(appUser);
        }else{
            throw new RuntimeException("Admin can not delete an admin or IsNotAdmin");
        }
    }


    public void changepassword(AppUserDTO appUserDTO, String user){

        AppUser appUser = userRepository.findByEmail(user)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if(appUserDTO.getPassword().length() > 8 || appUserDTO.getPassword().length() < 17 ){
            appUser.setPassword(passwordEncoder.encode(appUserDTO.getPassword()));
        }else{
            throw new RuntimeException("password incorrect");
        }
    }


    // FUNCTION SUPER ADMIN

    public void disableEnablePro(PersonDTO personDTO, String superA){
        AppUser appUser = userRepository.findByEmail(personDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if(checkSuperUser(superA) && !checkSuperUser(appUser.getEmail())){
            communicationEnableDisable(personDTO.getEmail(), personDTO.getEnable());
            appUser.setEnabled(personDTO.getEnable());
            userRepository.save(appUser);
        }else{
            throw new RuntimeException("Exception superAdmin");
        }

    }

    public void updatePro(PersonDTO personDTO){
        AppUser appUser = userRepository.findByEmail(personDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        Role role = roleRepository.findByName("ROLE_" + personDTO.getAuthority())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        if(appUser.getRoles().stream().noneMatch(fun -> fun.getName().equals("ROLE_SUPERADMIN"))
                && (role.getName().equals("ROLE_ADMIN") || role.getName().equals("ROLE_USER"))){

            communicationUpdate(personDTO.getEmail(), personDTO.getSalary(), personDTO.getPosizione(), personDTO.getAuthority());

            if (appUser.getRoles().stream().noneMatch(fun -> fun.getName().equals(role.getName()))) {
                appUser.addRole(role);
                userRepository.save(appUser);
            }

            if(appUser.getRoles().stream().anyMatch(fun -> fun.getName().equals("ROLE_ADMIN")) && role.getName().equals("ROLE_USER")){
                   appUser.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER").orElse(null)));
            }

        }else{
            throw new RuntimeException("Error SuperAdmin");
        }
    }


    public void deletePro(String email){
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if(appUser.getRoles().stream().noneMatch(fun -> fun.getName().equals("ROLE_SUPERADMIN"))){
            communicationDelete(email);
            userRepository.delete(appUser);
        }else{
            throw new RuntimeException("Error SuperAdmin");
        }
    }


    private Boolean checkAdmin(String email){
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not fount"));

        return appUser.getRoles().stream().anyMatch(use -> use.getName().equals("ROLE_ADMIN"));
    }

    private Boolean checkSuperUser(String superAdmin){
        AppUser appUser = userRepository.findByEmail(superAdmin)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        return appUser.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_SUPERADMIN"));
    }


    // FUNCTION COMMUNICATION
    private void communicationUpdate(String email, Integer salary, String posizione, String authority){
        String json = "{" +
                "\"email\":\"" + email + "\"," +
                "\"salary\":\"" + salary + "\"," +
                "\"posizione\":\"" + posizione + "\"," +
                "\"authority\":\"" + authority + "" +
                "\"}";

        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entityReq = new HttpEntity<>(json, requestHeader);

        try{
            ResponseEntity<String> result = restTemplate.exchange("http://usersB:8082/control/admin/update",
                    HttpMethod.PUT,
                    entityReq,
                    String.class);

            if(result.getStatusCode() != HttpStatus.OK){
                throw new RuntimeException("Errore nella modifica person");
            }
        }catch (Exception e){
            throw new RuntimeException("Eccezione della modifica person");
        }
    }


    private void communicationRegistration(String email){
        String json = "{\"email\":\"" + email + "\"}";

        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entityReq = new HttpEntity<String>(json, requestHeader);

        try{
            ResponseEntity<String> result = restTemplate.exchange("http://usersB:8082/control/admin/registration",
                    HttpMethod.POST,
                    entityReq,
                    String.class);

            if(result.getStatusCode() != HttpStatus.OK){
                throw new RuntimeException("Errore nella registrazione");
            }
        }catch (Exception e){
            throw new RuntimeException("Eccezione della registrazione" + e);
        }
    }


    private void communicationDelete(String email){
        String json = "{\"email\":\"" + email + "\"}";

        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entityReq = new HttpEntity<String>(json, requestHeader);

        try{
            ResponseEntity<String> result = restTemplate.exchange("http://usersB:8082/control/admin/delete",
                    HttpMethod.DELETE,
                    entityReq,
                    String.class);

            if(result.getStatusCode() != HttpStatus.OK){
                throw new RuntimeException("Errore nella registrazione");
            }
        }catch (Exception e){
            throw new RuntimeException("Eccezione della registrazione");
        }
    }


    private void communicationEnableDisable(String email, Boolean isenable){
        String json = "{" +
                "\"email\":\"" + email + "\"," +
                "\"enable\":\"" + isenable + "" +
                "\"}";

        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entityReq = new HttpEntity<String>(json, requestHeader);;

        try{
            ResponseEntity<String> result = restTemplate.exchange("http://usersB:8082/control/admin/enable",
                    HttpMethod.PUT,
                    entityReq,
                    String.class);

            if(result.getStatusCode() != HttpStatus.OK){
                throw new RuntimeException("Errore nella disabilitazione/abilitazione");
            }
        }catch (Exception e){
            throw new RuntimeException("Eccezione nella disabilitazione/abilitazione");
        }
    }

}
