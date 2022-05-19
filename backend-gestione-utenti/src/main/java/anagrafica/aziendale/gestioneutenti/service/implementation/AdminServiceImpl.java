package anagrafica.aziendale.gestioneutenti.service.implementation;

import anagrafica.aziendale.gestioneutenti.model.HardSkill;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.SoftSkill;
import anagrafica.aziendale.gestioneutenti.repository.HardskillRepository;
import anagrafica.aziendale.gestioneutenti.repository.PersonRepository;
import anagrafica.aziendale.gestioneutenti.repository.SoftskillRepository;
import anagrafica.aziendale.gestioneutenti.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service @AllArgsConstructor @Transactional
public class AdminServiceImpl implements AdminService {

    private PersonRepository personRepository;
    private final HardskillRepository hardskillRepository;
    private final SoftskillRepository softskillRepository;


    @Override
    public List<Person> getAllUser(String admin){
        if(checkAdmin(admin)){
            return personRepository.findAll();
        }else{
            throw new RuntimeException("isNotAdmin");
        }

    }

    @Override
    public Person findByEmail(String email, String admin){
        if(checkAdmin(admin)){
            return findPerson(email);
        }else{
            throw new RuntimeException("isNotAdmin");
        }
    }

    @Override
    public void registrationUser(Person personDTO){
        if(personRepository.findByEmail(personDTO.getEmail()).isPresent()){
            throw new RuntimeException("Email is present");}

        String[] dominio = personDTO.getEmail().split("@");
        String[] nameEsurname =dominio[0].split("\\.");

        if(!personDTO.getEmail().endsWith("@certimeter.it") || nameEsurname[0].isEmpty() || nameEsurname[1].isEmpty()){
            throw new RuntimeException("Email not is Certimeter");
        }

        Person person = new Person();
        person.setEmail(personDTO.getEmail());
        person.setName(nameEsurname[0]);
        person.setSurname(nameEsurname[1]);
        person.setAuthority("USER");
        person.setEnable(true);
        personRepository.save(person);
    }

    @Override
    public void delete(String email){
        Person person = findPerson(email);
        personRepository.delete(person);
    }

    @Override
    public void updateUser(Person person){
        Person updatePerson = findPerson(person.getEmail());

        updatePerson.setSalary(person.getSalary());
        updatePerson.setPosizione(person.getPosizione());

        if(!person.getAuthority().equalsIgnoreCase(updatePerson.getAuthority())){
            updatePerson.setAuthority(person.getAuthority());
        }
        personRepository.save(updatePerson);
    }

    @Override
    public List<HardSkill> getAllHardSkill(String admin){
        if(checkAdmin(admin)){
            return  hardskillRepository.findAll();
        }else{
            throw new RuntimeException("isNotAdmin");
        }
    }

    @Override
    public List<SoftSkill> getAllSoftSkill(String admin){
        if(checkAdmin(admin)){
            return  softskillRepository.findAll();
        }else{
            throw new RuntimeException("isNotAdmin");
        }
    }

    @Override
    public void enableDisable(Person person) {
        Person personUpdate = findPerson(person.getEmail());

        personUpdate.setEnable(person.getEnable());
        personRepository.save(personUpdate);
    }

    @Override
    public boolean checkRole(String admin, String user){
        if(checkAdmin(admin) && !checkAdmin(user)){
            return true;
        }else{
            throw new RuntimeException("Admin doing something wrong");
        }
    }

    private Person findPerson(String email){
        return personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Person with " + email + " don't exists"));
    }

    private Boolean checkAdmin(String email){
        Person person = findPerson(email);
        return (person.getAuthority().equals("ADMIN") || person.getAuthority().equals("SUPERADMIN"));
    }




//    @Override
//    public HardSkill addHardSkill(HardSkill skill){
//
//        Optional<HardSkill> softSkill = hardskillRepository.findByName(skill.getName());
//        if(softSkill.isPresent()) {
//            throw new IllegalStateException("skill already present");
//        }
//
//        return hardskillRepository.save(skill);
//    }
//
//    @Override
//    public SoftSkill addSoftSkill(SoftSkill skill){
//
//        Optional<SoftSkill> softSkill = softskillRepository.findByName(skill.getName());
//        if(softSkill.isPresent()) {
//            throw new IllegalStateException("skill already present");
//        }
//
//        return  softskillRepository.save(skill);
//    }


}
