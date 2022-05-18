package anagrafica.aziendale.gestioneutenti.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity @Table
@Getter @Setter @NoArgsConstructor
public class Experience {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_email", referencedColumnName = "email")
    @JsonIgnore
    private Person person;

    @Column(length = 20)
    private String company;

    private String position;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate startDate;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate endDate;

    @Column(length = 250)
    private String description;

    @Column(length = 25)
    private String companyConsulting;


    public Experience(Person person, String company, String position, LocalDate startDate, LocalDate endDate, String description, String companyConsulting) {
        this.person = person;
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.companyConsulting = companyConsulting;
    }
}
