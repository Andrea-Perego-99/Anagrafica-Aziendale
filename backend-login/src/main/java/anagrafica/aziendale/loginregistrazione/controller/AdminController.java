package anagrafica.aziendale.loginregistrazione.controller;

import anagrafica.aziendale.loginregistrazione.model.DTO.AppUserDTO;
import anagrafica.aziendale.loginregistrazione.model.DTO.PersonDTO;
import anagrafica.aziendale.loginregistrazione.service.DetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("") @RequiredArgsConstructor
public class AdminController {

    private final DetailService detailService;

    @PostMapping("/security/registration")
    public void register(@RequestBody AppUserDTO appUserDTO, @RequestAttribute("applicantUser") String admin) {
        detailService.registration(appUserDTO, admin);
    }

    @PutMapping("/security/disable")
    public void disableEnable(@RequestBody PersonDTO personDTO, @RequestAttribute("applicantUser") String admin) {
        detailService.disableEnable(personDTO, admin);
    }

    @DeleteMapping("/security/delete")
    public void deleteUser(@RequestBody AppUserDTO appUserDTO, @RequestAttribute("applicantUser") String admin) {
        detailService.deleteUser(appUserDTO.getEmail(), admin);
    }

    @PutMapping("/security/update")
    public void update(@RequestBody PersonDTO personDTO, @RequestAttribute("applicantUser") String admin) {
        detailService.update(personDTO, admin);
    }

    @DeleteMapping("/securitySuper/delete/pro")
    public void deletePro(@RequestBody AppUserDTO appUserDTO) {
        detailService.deletePro(appUserDTO.getEmail());
    }

    @PutMapping("/securitySuper/update/pro")
    public void updatePro(@RequestBody PersonDTO PersonDTO) {
        detailService.updatePro(PersonDTO);
    }

    @PutMapping("/securitySuper/disable")
    public void disableEnablePro(@RequestBody PersonDTO personDTO, @RequestAttribute("applicantUser") String admin) {
        detailService.disableEnablePro(personDTO, admin);
    }

}