package anagrafica.aziendale.gestioneutenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table
@Getter @Setter @NoArgsConstructor
public class Person_Soft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @ManyToOne() //fetch = FetchType.LAZY
    @JoinColumn(name = "person_email", referencedColumnName = "email")
    @JsonIgnore
    private Person person;

    @ManyToOne()
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private SoftSkill softSkill;

    @Column
    private byte level;

    public Person_Soft(Person person, SoftSkill softSkill, byte level) {
        this.person = person;
        this.softSkill = softSkill;
        this.level = level;
    }
}
