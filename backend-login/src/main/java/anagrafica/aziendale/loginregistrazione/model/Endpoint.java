package anagrafica.aziendale.loginregistrazione.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor @Data
@Entity @Table(name="endpoint")
public class Endpoint {

    @Id
    private String path;

}
