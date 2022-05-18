package anagrafica.aziendale.gestioneutenti.service;

import anagrafica.aziendale.gestioneutenti.model.DTO.RegistrationDTO;
import anagrafica.aziendale.gestioneutenti.model.DTO.SkillDTO;
import anagrafica.aziendale.gestioneutenti.model.Experience;
import anagrafica.aziendale.gestioneutenti.model.Images;
import anagrafica.aziendale.gestioneutenti.model.Person;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PersonService {

    Person findByData(String email);

    Person updateUser(Person person, String email);

     void addSoftToPerson(String email, SkillDTO skillDTO);

     void addHardToPerson(String email, SkillDTO skillDTO);

     void addExperience(String email, Experience experience);

     void addOfficetoPerson(String email, SkillDTO skillDTO);

     void addImage(String email, MultipartFile img) throws IOException;

     Images getImage(String name);

    void deleteHard(String email, SkillDTO skillDTO);

    void deleteSoft(String email, SkillDTO skillDTO);

    void deleteOffice(String email, SkillDTO skillDTO);

    void deleteExperience(String email, Experience experience);


}
