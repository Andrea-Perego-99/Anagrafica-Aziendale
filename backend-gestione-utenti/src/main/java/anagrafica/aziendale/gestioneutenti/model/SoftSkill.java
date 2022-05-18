package anagrafica.aziendale.gestioneutenti.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor @AllArgsConstructor
@Data @Entity @Table(name="softskill")
public class SoftSkill {

    @Id
    private String name;

}
