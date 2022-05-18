package anagrafica.aziendale.loginregistrazione.model.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PersonDTO {

    private String email;
    private Integer salary;
    private String posizione;
    private String authority;
    private Boolean enable;

}
