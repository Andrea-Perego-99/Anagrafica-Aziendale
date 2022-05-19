package anagrafica.aziendale.gestioneutenti.repository;

import anagrafica.aziendale.gestioneutenti.model.Experience;
import anagrafica.aziendale.gestioneutenti.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    @Query(value = "SELECT * FROM experience WHERE person_email= :#{#person.email} AND start_date= :#{#ex.startDate} AND end_date= :#{#ex.endDate}",
            nativeQuery = true)
    Optional<Experience> existsExperience(@Param("person") Person person, @Param("ex") Experience experience);

}
