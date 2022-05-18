package anagrafica.aziendale.gestioneutenti.repository.CommunicationRepo;

import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.Person_Soft;
import anagrafica.aziendale.gestioneutenti.model.SoftSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PSrepository extends JpaRepository<Person_Soft, Long> {

    @Query(value = "SELECT * FROM person_soft WHERE person_email= :#{#person.email} AND soft_skill_name= :#{#skill.name}",
            nativeQuery = true)
    Optional<Person_Soft> updateSkill(@Param("person") Person person, @Param("skill") SoftSkill skill);
}
