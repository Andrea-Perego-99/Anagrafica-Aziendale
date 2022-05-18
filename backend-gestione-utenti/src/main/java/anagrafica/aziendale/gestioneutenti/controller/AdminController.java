package anagrafica.aziendale.gestioneutenti.controller;

import anagrafica.aziendale.gestioneutenti.model.DTO.SkillDTO;
import anagrafica.aziendale.gestioneutenti.model.HardSkill;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.SoftSkill;
import anagrafica.aziendale.gestioneutenti.service.AdminService;
import anagrafica.aziendale.gestioneutenti.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/control/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final PersonService personService;

    @PostMapping("/userById")
    public Person getByEmail(@RequestBody Person person, @RequestHeader("applicantUser") String email) {
        return adminService.findByEmail(person.getEmail(), email);
    }

    @GetMapping("/all")
    public List<Person> getAll(@RequestHeader("applicantUser") String email) {
        return adminService.getAllUser(email);
    }

    @GetMapping("/hardskill")
    public List<HardSkill> getAllHard(@RequestHeader("applicantUser") String email) {
        return adminService.getAllHardSkill(email);
    }

    @GetMapping("/softskill")
    public List<SoftSkill> getAllSoft(@RequestHeader("applicantUser") String email) {
        return adminService.getAllSoftSkill(email);
    }

    // CHECK ADMN FINO A SOPRA

    @PutMapping("/hardskill")
    public void HardToPerson(@RequestHeader("user") String email, @RequestHeader("applicantUser") String admin, @RequestBody List<SkillDTO> skillDTO) {
        if(adminService.checkRole(admin, email)){
            skillDTO.forEach(skill -> personService.addHardToPerson(email, skill));
        }
    }

    @PutMapping("/softskill")
    public void SoftToPerson(@RequestHeader("user") String email, @RequestHeader("applicantUser") String admin, @RequestBody List<SkillDTO> skillDTO) {
        if(adminService.checkRole(admin, email)){
            skillDTO.forEach(skill -> personService.addSoftToPerson(email, skill));
        }
    }

    @PutMapping("/officesuite")
    public void OfficeToPerson(@RequestHeader("user") String email,  @RequestHeader("applicantUser") String admin, @RequestBody List<SkillDTO> skillDTO) {
        if(adminService.checkRole(admin, email)){
            skillDTO.forEach(skill -> personService.addOfficetoPerson(email, skill));
        }
    }

    @DeleteMapping("/officesuite")
    public void deleteOffice (@RequestHeader("user") String email, @RequestHeader("applicantUser") String admin, @RequestBody SkillDTO skillDTO){
        if(adminService.checkRole(admin, email)){
            personService.deleteOffice(email, skillDTO);
        }
    }

    @DeleteMapping("/hardskill")
    public void deleteHard (@RequestHeader("user") String email, @RequestHeader("applicantUser") String admin, @RequestBody SkillDTO skillDTO){
        if(adminService.checkRole(admin, email)){
            personService.deleteHard(email, skillDTO);
        }
    }

    @DeleteMapping("/softskill")
    public void deleteSoft (@RequestHeader("user") String email, @RequestHeader("applicantUser") String admin, @RequestBody SkillDTO skillDTO){
        if(adminService.checkRole(admin, email)){
            personService.deleteSoft(email, skillDTO);
        }
    }

    // CHIAMATE DA MICROSERVIZIO

    @PostMapping("/registration")
    public void add(@RequestBody Person person) {
        adminService.registrationUser(person);
    }

    @PutMapping("/enable")
    public void enable(@RequestBody Person  person) { adminService.enableDisable(person);}

    @PutMapping("/update")
    public void update(@RequestBody Person person) { adminService.updateUser(person);}

    @DeleteMapping("/delete")
    public void delete(@RequestBody Person person) {
        adminService.delete(person.getEmail());
    }




//    @PostMapping("/hardskill")
//    public HardSkill addHardSkill(@RequestBody HardSkill skill) {
//        return adminService.addHardSkill(skill);
//    }
//
//    @PostMapping("/softskill")
//    public SoftSkill addSoftSkill(@RequestBody SoftSkill skill) {
//        return adminService.addSoftSkill(skill);
//    }


}
