package anagrafica.aziendale.loginregistrazione.service.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Locale;

@Service
public class EmailService implements EmailSender{

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String email, String code) {
        try{
            MimeMessage message = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Registrazione servizio anagrafica dipendenti");

            String name = email.toUpperCase(Locale.ROOT).replaceAll("\\..*", "");
            String mailContent = "<p>Salve "+ name + ",</p>";
            mailContent += "<p>Sei stato inserito nel sistema di anagrafica aziendale</p>";
            mailContent += "<p>Di seguito le infromazioni per effettuare il primo accesso: </p>";
            mailContent += "<p>Email: " + email + "</p>";
            mailContent += "<p>Password: " + code + "</p>";
            mailContent += "<h2>Ricorda di cambiare la password al primo accesso</h2>";
            String verifyURL = "http://localhost:3000";
            mailContent += "<a href=\"" + verifyURL +"\"><h3>ACCEDI</h3></a>";
            mailContent += "<p><br>Grazie<br>Amministrazione Certimeter</p>";

            helper.setText(mailContent, true);

            javaMailSender.send(message);

        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
