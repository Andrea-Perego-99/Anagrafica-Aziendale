package anagrafica.aziendale.gestioneutenti.service;

import anagrafica.aziendale.gestioneutenti.model.HardSkill;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.SoftSkill;

import java.util.List;

public interface AdminService {

    List<Person> getAllUser(String admin);

    Person findByEmail(String email, String admin);

    void registrationUser(Person person);

    void delete(String email);

    void updateUser(Person person);

    List<HardSkill> getAllHardSkill(String email);

    List<SoftSkill> getAllSoftSkill(String email);

    void enableDisable(Person person);

    boolean checkRole(String admin, String user);

    //    HardSkill addHardSkill(HardSkill skill);

    //    SoftSkill addSoftSkill(SoftSkill skill);

}
