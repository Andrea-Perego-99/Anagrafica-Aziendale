package anagrafica.aziendale.gestioneutenti.model.DTO;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PersonSkillDTO {

    @NonNull
    String email;
    @NotNull
    List<SkillDTO> skillDTOS;

}
