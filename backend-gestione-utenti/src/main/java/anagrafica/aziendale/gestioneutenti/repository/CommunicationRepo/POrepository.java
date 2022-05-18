package anagrafica.aziendale.gestioneutenti.repository.CommunicationRepo;

import anagrafica.aziendale.gestioneutenti.model.OfficeSuite;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.Person_OfficeSuite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface POrepository extends JpaRepository<Person_OfficeSuite, Long> {

    @Query(value = "SELECT * FROM person_officesuite WHERE person_email= :#{#person.email} AND office_suite_name= :#{#skill.name}",
            nativeQuery = true)
    Optional<Person_OfficeSuite> updateSkill(@Param("person") Person person, @Param("skill") OfficeSuite skill);

}
