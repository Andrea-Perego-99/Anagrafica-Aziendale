package anagrafica.aziendale.loginregistrazione.repository;

import anagrafica.aziendale.loginregistrazione.model.Endpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EndopointRepository extends JpaRepository<Endpoint, String> {

    Optional<Endpoint> findByPath(String path);

}
