package anagrafica.aziendale.gestioneutenti.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@NoArgsConstructor @AllArgsConstructor @Data
@Entity @Table(name = "person")
public class Person {

    @Id @NotNull
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate birthDay;

    @Column(length = 14)
    private String cellPhone;
    private String cityName;
    private String address;

    private Integer salary;
    private String posizione;
    private String authority;
    private Boolean enable;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "images_id")
    private Images image;

    @OneToMany(mappedBy = "person", cascade = CascadeType.REMOVE)
    private Collection<Person_Hard> hardSkill = new ArrayList<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.REMOVE)
    private Collection<Person_Soft> softSkill = new ArrayList<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.REMOVE)
    private Collection<Experience> experience = new ArrayList<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.REMOVE)
    private Collection<Person_OfficeSuite> officeSuites = new ArrayList<>();

    public Person(String email, String name, String surname, LocalDate birthDay, String cellPhone, String cityName, String address, Integer salary, String posizione, String authority) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.birthDay = birthDay;
        this.cellPhone = cellPhone;
        this.cityName = cityName;
        this.address = address;
        this.salary = salary;
        this.posizione = posizione;
        this.authority = authority;
    }

    public void addPerson_Soft(Person_Soft person_soft){
        softSkill.add(person_soft);
    }

    public void addPerson_Hard(Person_Hard person_hard){
        hardSkill.add(person_hard);
    }

    public void addPerson_Experience(Experience experience_pearson){
        experience.add(experience_pearson);
    }

    public void addPerson_OfficeSuite(Person_OfficeSuite office_person){officeSuites.add(office_person);}


}
