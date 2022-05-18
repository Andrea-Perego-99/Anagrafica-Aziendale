package anagrafica.aziendale.loginregistrazione.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@NoArgsConstructor @Getter @Setter
@Entity @Table(name="role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "roles_endpoint",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "endpoint_path", referencedColumnName = "path"))
    private Collection<Endpoint> endpoints = new ArrayList<>();


    public Role(String name) {
        this.name = name;
    }

    /*public void addPath(Endpoint endpoint){
        this.endpoints.add(endpoint);
    }*/

}