package anagrafica.aziendale.loginregistrazione.controller;

import anagrafica.aziendale.loginregistrazione.model.DTO.AppUserDTO;
import anagrafica.aziendale.loginregistrazione.service.DetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/securityU") @RequiredArgsConstructor
public class UserController {

    private final DetailService detailService;

    @GetMapping("/SecurityEndpoint")
    public void ControllerEndPoint() {}

    @PutMapping("/password")
    public void changePassword(@RequestBody AppUserDTO appUserDTO, @RequestAttribute("applicantUser") String user){
        System.out.println(user);
        detailService.changepassword(appUserDTO, user);
    }

}
