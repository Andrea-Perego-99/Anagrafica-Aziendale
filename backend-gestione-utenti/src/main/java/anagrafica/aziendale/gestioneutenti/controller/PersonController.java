package anagrafica.aziendale.gestioneutenti.controller;

import anagrafica.aziendale.gestioneutenti.model.DTO.RegistrationDTO;
import anagrafica.aziendale.gestioneutenti.model.DTO.SkillDTO;
import anagrafica.aziendale.gestioneutenti.model.Experience;
import anagrafica.aziendale.gestioneutenti.model.Images;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/control/person")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping()
    public Person getPerson(@RequestHeader("applicantUser") String email){
        return personService.findByData(email);
    }

    @PutMapping()
    public Person updatedata(@RequestHeader("applicantUser") String email, @RequestBody Person person){
        return personService.updateUser(person, email);
    }

    @PostMapping("/experience")
    public void Experience(@RequestHeader("applicantUser") String email, @RequestBody List<Experience> experience){
        experience.forEach(exp -> personService.addExperience(email, exp));
    }

    @DeleteMapping("/experience")
    public void deleteExperience(@RequestHeader("applicantUser") String email, @RequestBody Experience experience){
        personService.deleteExperience(email, experience);
    }

    @PutMapping("/hardskill")
    public void HardToPerson(@RequestHeader("applicantUser") String email, @RequestBody List<SkillDTO> skillDTO){
        skillDTO.forEach(skill -> personService.addHardToPerson(email, skill));
    }

    @DeleteMapping("/hardskill")
    public void deleteHard (@RequestHeader("applicantUser") String email, @RequestBody SkillDTO skillDTO){
        personService.deleteHard(email, skillDTO);
    }

    @PutMapping("/softskill")
    public void SoftToPerson(@RequestHeader("applicantUser") String email, @RequestBody List<SkillDTO> skillDTO){
        skillDTO.forEach(skill -> personService.addSoftToPerson(email, skill));
    }

    @DeleteMapping("/softskill")
    public void deleteSoft (@RequestHeader("applicantUser") String email, @RequestBody SkillDTO skillDTO){
        personService.deleteSoft(email, skillDTO);
    }

    @PutMapping("/officesuite")
    public void OfficeToPerson(@RequestHeader("applicantUser") String email, @RequestBody List<SkillDTO> skillDTO){
        skillDTO.forEach(skill -> personService.addOfficetoPerson(email, skill));
    }

    @DeleteMapping("/officesuite")
    public void deleteOffice (@RequestHeader("applicantUser") String email, @RequestBody SkillDTO skillDTO){
        personService.deleteOffice(email, skillDTO);
    }

    @PostMapping("/image")
    public void uplaodImage(@RequestHeader("applicantUser") String email, @RequestParam("image") MultipartFile file)
            throws IOException {
        personService.addImage(email, file);
    }

    @GetMapping("/image")
    public Images getImage(@RequestHeader("applicantUser") String name) throws IOException{

        return personService.getImage(name);
    }

}
