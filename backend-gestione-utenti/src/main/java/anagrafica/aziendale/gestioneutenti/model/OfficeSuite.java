package anagrafica.aziendale.gestioneutenti.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@AllArgsConstructor @Data
@Entity @Table(name="officesuite")
public class OfficeSuite {

    @Id
    private String name;

}
