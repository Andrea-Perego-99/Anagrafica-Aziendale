package anagrafica.aziendale.loginregistrazione.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@NoArgsConstructor @Data
@Entity @Table(name="user")
public class AppUser {

    @Id
    private String email;
    private String password;
    private boolean enabled;
    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_email", referencedColumnName = "email"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;

    public void addRole(Role role){
        roles.add(role);
    }
}
