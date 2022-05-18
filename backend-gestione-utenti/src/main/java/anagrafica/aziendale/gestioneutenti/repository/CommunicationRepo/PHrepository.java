package anagrafica.aziendale.gestioneutenti.repository.CommunicationRepo;

import anagrafica.aziendale.gestioneutenti.model.HardSkill;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.Person_Hard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PHrepository extends JpaRepository<Person_Hard, Long> {

    @Query(value = "SELECT * FROM person_hard WHERE person_email= :#{#person.email} AND hard_skill_name= :#{#skill.name}",
            nativeQuery = true)
    Optional<Person_Hard> updateSkill(@Param("person") Person person, @Param("skill") HardSkill skill);

}
