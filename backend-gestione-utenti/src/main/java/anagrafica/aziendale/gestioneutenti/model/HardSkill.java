package anagrafica.aziendale.gestioneutenti.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
@Entity @Table(name="hardskill")
public class HardSkill {

    @Id
    private String name;

}
