package anagrafica.aziendale.gestioneutenti.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SkillDTO {

    @NonNull
    private String name;
    @NonNull
    private byte level;

}
