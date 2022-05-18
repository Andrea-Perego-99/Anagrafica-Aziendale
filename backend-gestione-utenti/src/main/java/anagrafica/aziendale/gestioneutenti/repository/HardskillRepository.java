package anagrafica.aziendale.gestioneutenti.repository;

import anagrafica.aziendale.gestioneutenti.model.HardSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HardskillRepository extends JpaRepository<HardSkill, String> {

    Optional<HardSkill> findByName(String name);

}
