package anagrafica.aziendale.gestioneutenti;

import anagrafica.aziendale.gestioneutenti.model.OfficeSuite;
import anagrafica.aziendale.gestioneutenti.model.Person;
import anagrafica.aziendale.gestioneutenti.model.SoftSkill;
import anagrafica.aziendale.gestioneutenti.repository.OfficeSuiteRepository;
import anagrafica.aziendale.gestioneutenti.repository.PersonRepository;
import anagrafica.aziendale.gestioneutenti.repository.SoftskillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class GestioneUtentiApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(GestioneUtentiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
	}
}
