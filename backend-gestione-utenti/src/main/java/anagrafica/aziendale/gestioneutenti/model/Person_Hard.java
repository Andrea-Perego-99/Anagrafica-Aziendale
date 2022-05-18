package anagrafica.aziendale.gestioneutenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table
@Getter @Setter @NoArgsConstructor
public class Person_Hard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) @JsonIgnore
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_email", referencedColumnName = "email")
    @JsonIgnore
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private HardSkill hardSkill;

    @Column
    private byte level;

    public Person_Hard(Person person, HardSkill hardSkill, byte level) {
        this.person = person;
        this.hardSkill = hardSkill;
        this.level = level;
    }
}
