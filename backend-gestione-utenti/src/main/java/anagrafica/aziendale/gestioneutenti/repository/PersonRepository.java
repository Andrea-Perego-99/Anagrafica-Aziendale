package anagrafica.aziendale.gestioneutenti.repository;

import anagrafica.aziendale.gestioneutenti.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, String> {

    Optional<Person> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean deleteByEmail(String email);
    Person findByName(String name);
    Person findBySurname(String surname);

}
