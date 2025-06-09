package bidweb.desafio.dgm.config;

import bidweb.desafio.dgm.infra.security.jwt.JWTFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    public static final String AUTHENTICATION_SCHEME = "bearerAuth";

    @Autowired
    private SecurityDatabaseService securityService;

    @Autowired
    private EncoderConfig encoder;

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(securityService).passwordEncoder(encoder.passwordEncoder());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin())
                )
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {}) // Habilita CORS sem configurações específicas
                .addFilterAfter(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/cadastro", "/auth/login").permitAll()
                        .requestMatchers("/vendas/**").hasRole("USERS")
                        .requestMatchers("/h2-console/**").permitAll()
                        //.requestMatchers("/v3/api-docs/**", "swagger-ui/**", "swagger-ui.html").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        //.httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
