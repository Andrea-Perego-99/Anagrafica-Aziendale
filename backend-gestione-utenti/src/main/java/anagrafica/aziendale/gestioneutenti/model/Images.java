package anagrafica.aziendale.gestioneutenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "images") @Data
@NoArgsConstructor
@AllArgsConstructor
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "image")
    @JsonIgnore
    private Person person;

    @Column(name = "image", unique = false, nullable = false, length = 100000)
    private byte[] image;

    public Images(Person person, byte[] image) {
        this.person = person;
        this.image = image;
    }
}
