package anagrafica.aziendale.gestioneutenti.model.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor
public class RegistrationDTO {
        private String email;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate birthday;
}
