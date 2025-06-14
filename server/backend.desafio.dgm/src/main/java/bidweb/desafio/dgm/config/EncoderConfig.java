package bidweb.desafio.dgm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class EncoderConfig {
    private static final BCryptPasswordEncoder ENCODER = new BCryptPasswordEncoder();

    @Bean
    public PasswordEncoder passwordEncoder() {
        return ENCODER;
    }
}
