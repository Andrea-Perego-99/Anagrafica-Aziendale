package anagrafica.aziendale.gestioneutenti.repository;

import anagrafica.aziendale.gestioneutenti.model.SoftSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SoftskillRepository extends JpaRepository<SoftSkill, String> {

    Optional<SoftSkill> findByName(String name);

}
