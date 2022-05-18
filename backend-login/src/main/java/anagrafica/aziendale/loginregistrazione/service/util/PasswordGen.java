package anagrafica.aziendale.loginregistrazione.service.util;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor @Component
public class PasswordGen {


    public String Gen(){

        StringBuilder password = new StringBuilder();
        String cara = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890!@#%&*()-_=+{[}]<>?";
        int lunghezza = 12 + (int) (Math.random() * (16-12));

        for(int i = 0; i<= lunghezza; i++){

            password.append(cara.charAt((int) (Math.random() * 81)));
        }

        return password.toString();
    }

}
