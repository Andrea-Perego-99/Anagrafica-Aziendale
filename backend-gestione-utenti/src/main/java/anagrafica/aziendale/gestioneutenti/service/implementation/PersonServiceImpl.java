package anagrafica.aziendale.gestioneutenti.service.implementation;

import anagrafica.aziendale.gestioneutenti.model.DTO.RegistrationDTO;
import anagrafica.aziendale.gestioneutenti.model.DTO.SkillDTO;
import anagrafica.aziendale.gestioneutenti.model.*;
import anagrafica.aziendale.gestioneutenti.repository.CommunicationRepo.PHrepository;
import anagrafica.aziendale.gestioneutenti.repository.CommunicationRepo.POrepository;
import anagrafica.aziendale.gestioneutenti.repository.CommunicationRepo.PSrepository;
import anagrafica.aziendale.gestioneutenti.repository.*;
import anagrafica.aziendale.gestioneutenti.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@Service @RequiredArgsConstructor @Transactional
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
    private final HardskillRepository hardskillRepository;
    private final SoftskillRepository softskillRepository;
    private final PHrepository pHrepository;
    private final PSrepository pSrepository;
    private final ExperienceRepository experienceRepository;
    private final POrepository pOrepository;
    private final OfficeSuiteRepository officeSuiteRepository;
    private final ImagesRepository imagesRepository;


    @Override
    public Person findByData(String email){
        return personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Person with " + email + " don't exists"));

    }

    @Override
    public Person updateUser(Person person, String email) {
        Person updatePerson = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Person with " + email + " don't exists"));

        updatePerson.setAddress(person.getAddress());
        updatePerson.setCityName(person.getCityName());
        updatePerson.setCellPhone(person.getCellPhone());
        updatePerson.setBirthDay(person.getBirthDay());

        return personRepository.save(updatePerson);
    }

    @Override
    public void addSoftToPerson(String email, SkillDTO skillDTO){
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        Person_Soft person_soft;

        if(skillDTO.getLevel() < 0 || skillDTO.getLevel() > 5){
            throw new RuntimeException("level is wrong");
        }

        Optional<SoftSkill> skill= softskillRepository.findByName(skillDTO.getName());

        if(skill.isEmpty()){
            throw new RuntimeException("SKILL NON PRESENTE NELL'ELENCO");
        }

        if(pSrepository.updateSkill(person, skill.get()).isPresent()){
            person_soft = pSrepository.updateSkill(person, skill.get()).get();
            person_soft.setLevel(skillDTO.getLevel());
            pSrepository.save(person_soft);

        }else{
            person_soft = new Person_Soft(person, skill.get(), skillDTO.getLevel());
            pSrepository.save(person_soft);
        }
    }

    @Override
    public void addHardToPerson(String email, SkillDTO skillDTO){
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        Person_Hard person_hard;
        HardSkill skill;

        if(skillDTO.getLevel() < 0 || skillDTO.getLevel() > 5){
            throw new RuntimeException("level is wrong");
        }

        if(hardskillRepository.findByName(skillDTO.getName()).isEmpty()){
             skill = hardskillRepository.save(new HardSkill(skillDTO.getName()));
        }else{
            skill = hardskillRepository.findByName(skillDTO.getName()).get();
        }

        if(pHrepository.updateSkill(person, skill).isPresent()){
            person_hard = pHrepository.updateSkill(person, skill).get();
            person_hard.setLevel(skillDTO.getLevel());
            pHrepository.save(person_hard);

        }else{
            person_hard = new Person_Hard(person, skill, skillDTO.getLevel());
            pHrepository.save(person_hard);
        }
    }

    @Override
    public void addExperience(String email, Experience experience) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        if(person.getExperience().stream().anyMatch(ex ->
                ex.getCompany().equals(experience.getCompany()) &&
                        ex.getEndDate().equals(experience.getEndDate()) &&
                        ex.getStartDate().equals(experience.getStartDate()))){
            System.out.println("Skill Already Present");
        }else{
            experience.setPerson(person);
            experienceRepository.save(experience);
            person.addPerson_Experience(experience);
            personRepository.save(person);
        }
    }


    @Override
    public void addOfficetoPerson(String email, SkillDTO skillDTO){
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        Person_OfficeSuite person_officeSuite;

        if(skillDTO.getLevel() < 0 || skillDTO.getLevel() > 5){
            throw new RuntimeException("level is wrong");
        }

        Optional<OfficeSuite> skill = officeSuiteRepository.findByName(skillDTO.getName());

        if(skill.isEmpty()){
            throw new RuntimeException("SKILL NON PRESENTE NELL'ELENCO");
        }

        if(pOrepository.updateSkill(person, skill.get()).isPresent()){
            person_officeSuite = pOrepository.updateSkill(person, skill.get()).get();
            person_officeSuite.setLevel(skillDTO.getLevel());
            pOrepository.save(person_officeSuite);

        }else{
            person_officeSuite = new Person_OfficeSuite(person, skill.get(), skillDTO.getLevel());
            pOrepository.save(person_officeSuite);
        }

    }

    @Override
    public void addImage(String email, MultipartFile img) throws IOException {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        if (img.getContentType().equals(MediaType.IMAGE_JPEG_VALUE)) {
            Images images = new Images(person, img.getBytes());

            person.setImage(images);
            imagesRepository.save(images);
            personRepository.save(person);

        } else {
            throw new RuntimeException("File non jpeg");
        }
    }

    @Override
    public Images getImage(String email){

        Optional<Person> person = personRepository.findByEmail(email);

        return person.get().getImage();

    }

    @Override
    public void deleteHard(String email, SkillDTO skillDTO) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        Optional<HardSkill> hardSkill = hardskillRepository.findByName(skillDTO.getName());

        if(hardSkill.isPresent()){
            Optional<Person_Hard> person_hard = pHrepository.updateSkill(person, hardSkill.get());
            if(person_hard.isPresent()) {
                pHrepository.delete(person_hard.get());
            }
        }

    }

    @Override
    public void deleteSoft(String email, SkillDTO skillDTO) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        SoftSkill skill = softskillRepository.findByName(skillDTO.getName())
                .orElseThrow(() -> new RuntimeException("Skill non presentre"));

        Optional<Person_Soft> person_soft = pSrepository.updateSkill(person, skill);
        if(person_soft.isPresent()) {
            pSrepository.delete(person_soft.get());
        }

    }

    @Override
    public void deleteOffice(String email, SkillDTO skillDTO) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        OfficeSuite officeSuite = officeSuiteRepository.findByName(skillDTO.getName())
                .orElseThrow(() -> new RuntimeException("Skill non presente"));

        Optional<Person_OfficeSuite> person_officeSuite = pOrepository.updateSkill(person, officeSuite);
        if(person_officeSuite.isPresent()) {
            pOrepository.delete(person_officeSuite.get());
        }
    }

    @Override
    public void deleteExperience(String email, Experience experience) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email not present"));

        Collection<Experience> experiences = person.getExperience();
        experiences.remove(experience);

        personRepository.save(person);

    }

}
