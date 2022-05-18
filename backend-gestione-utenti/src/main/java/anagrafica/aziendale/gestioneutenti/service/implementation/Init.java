package anagrafica.aziendale.gestioneutenti.service.implementation;

import anagrafica.aziendale.gestioneutenti.model.OfficeSuite;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.SoftSkill;
import anagrafica.aziendale.gestioneutenti.repository.OfficeSuiteRepository;
import anagrafica.aziendale.gestioneutenti.repository.PersonRepository;
import anagrafica.aziendale.gestioneutenti.repository.SoftskillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class Init {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private SoftskillRepository softskillRepository;
    @Autowired
    private OfficeSuiteRepository officeSuiteRepository;

    @PostConstruct
    public void init(){
        if(personRepository.findByEmail("admin.root@certimeter.it").isEmpty()){
            Person person = new Person();
            person.setEmail("admin.root@certimeter.it");
            person.setName("SUPER");
            person.setSurname("SUPER");
            person.setAuthority("SUPERADMIN");
            person.setPosizione("CEO");
            person.setEnable(true);
            personRepository.save(person);
        }

        if(personRepository.findByEmail("admin.admin@certimeter.it").isEmpty()){
            Person person = new Person();
            person.setEmail("admin.admin@certimeter.it");
            person.setName("ADMIN");
            person.setSurname("ADMIN");
            person.setCellPhone("575757575");
            person.setCityName("Torino");
            person.setAddress("corso svizzera 185");
            person.setSalary(7000);
            person.setAuthority("ADMIN");
            person.setPosizione("Admin");
            person.setEnable(true);
            personRepository.save(person);
        }

        if(softskillRepository.findByName("Autonomy").isEmpty()){
            softskillRepository.save(new SoftSkill("Autonomy"));
        }

        if(softskillRepository.findByName("Self Confidence").isEmpty()){
            softskillRepository.save(new SoftSkill("Self Confidence"));
        }

        if(softskillRepository.findByName("Flexibility").isEmpty()){
            softskillRepository.save(new SoftSkill("Flexibility"));
        }

        if(softskillRepository.findByName("Resilience to stress").isEmpty()){
            softskillRepository.save(new SoftSkill("Resilience to stress"));
        }

        if(softskillRepository.findByName("Capacity of organizing").isEmpty()){
            softskillRepository.save(new SoftSkill("Capacity of organizing"));
        }

        if(softskillRepository.findByName("Precision").isEmpty()){
            softskillRepository.save(new SoftSkill("Precision"));
        }

        if(softskillRepository.findByName("Learning capability").isEmpty()){
            softskillRepository.save(new SoftSkill("Learning capability"));
        }

        if(softskillRepository.findByName("Ability to achieve goals").isEmpty()){
            softskillRepository.save(new SoftSkill("Ability to achieve goals"));
        }

        if(softskillRepository.findByName("Information handling").isEmpty()){
            softskillRepository.save(new SoftSkill("Information handling"));
        }

        if(softskillRepository.findByName("Initiative").isEmpty()){
            softskillRepository.save(new SoftSkill("Initiative"));
        }

        if(softskillRepository.findByName("Comunication skills").isEmpty()){
            softskillRepository.save(new SoftSkill("Comunication skills"));
        }

        if(softskillRepository.findByName("Problem solving").isEmpty()){
            softskillRepository.save(new SoftSkill("Problem solving"));
        }

        if(softskillRepository.findByName("Teamwork").isEmpty()){
            softskillRepository.save(new SoftSkill("Teamwork"));
        }

        if(softskillRepository.findByName("Leadership").isEmpty()){
            softskillRepository.save(new SoftSkill("Leadership"));
        }

        if(officeSuiteRepository.findByName("Word").isEmpty()){
            officeSuiteRepository.save(new OfficeSuite("Word"));
        }

        if(officeSuiteRepository.findByName("PowerPoint").isEmpty()){
            officeSuiteRepository.save(new OfficeSuite("PowerPoint"));
        }

        if(officeSuiteRepository.findByName("Excel").isEmpty()){
            officeSuiteRepository.save(new OfficeSuite("Excel"));
        }

        if(officeSuiteRepository.findByName("Outlook").isEmpty()){
            officeSuiteRepository.save(new OfficeSuite("Outlook"));
        }
    }

}
