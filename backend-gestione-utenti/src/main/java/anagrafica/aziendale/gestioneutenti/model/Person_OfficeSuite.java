package anagrafica.aziendale.gestioneutenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(name="person_officesuite")
@Getter @Setter @NoArgsConstructor
public class Person_OfficeSuite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) @JsonIgnore
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_email", referencedColumnName = "email")
    @JsonIgnore
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private OfficeSuite officeSuite;

    @Column
    private byte level;

    public Person_OfficeSuite(Person person, OfficeSuite officeSuite, byte level) {
        this.person = person;
        this.officeSuite = officeSuite;
        this.level = level;
    }
}
