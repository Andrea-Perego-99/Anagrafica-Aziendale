package anagrafica.aziendale.gestioneutenti.repository;

import anagrafica.aziendale.gestioneutenti.model.OfficeSuite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OfficeSuiteRepository extends JpaRepository<OfficeSuite, String> {

    Optional<OfficeSuite> findByName(String name);

}
