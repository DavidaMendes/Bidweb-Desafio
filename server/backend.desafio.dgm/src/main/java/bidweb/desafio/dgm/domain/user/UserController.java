package bidweb.desafio.dgm.domain.user;

import bidweb.desafio.dgm.config.KeyConfig;
import bidweb.desafio.dgm.domain.user.dto.UserRequestDTO;
import bidweb.desafio.dgm.domain.user.dto.UserResponseDTO;
import bidweb.desafio.dgm.infra.security.dto.Login;
import bidweb.desafio.dgm.infra.security.dto.Sessao;
import bidweb.desafio.dgm.infra.security.jwt.JWTCreator;
import bidweb.desafio.dgm.infra.security.jwt.JWTObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/auth")
//@SecurityRequirement(name = WebSecurityConfig.AUTHENTICATION_SCHEME)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/cadastro")
    public ResponseEntity<UserResponseDTO> cadastro(@RequestBody UserRequestDTO request) {
        userService.create(request);
        return ResponseEntity.ok().body(new UserResponseDTO());
    }

    @PostMapping("/login")
    public Sessao login(@RequestBody Login login){
        User user = userService.findByUsername(login);
        if(user!=null) {
            SecurityContextHolder.clearContext();

            boolean passwordOk = encoder.matches(login.getPassword(), user.getPassword());
            System.out.println("User login attempt: " + login.getUsername());
            System.out.println("Password match result: " + passwordOk);

            if (!passwordOk) {
                throw new RuntimeException("Senha inválida para o login: " + login.getUsername());
            }

            Sessao sessao = new Sessao();
            sessao.setLogin(user.getUsername());

            JWTObject jwtObject = new JWTObject();
            jwtObject.setSubject(user.getUsername());
            jwtObject.setIssueedAT(new Date(System.currentTimeMillis()));
            jwtObject.setExpiration((new Date(System.currentTimeMillis() + KeyConfig.EXPIRATION)));
            jwtObject.setRoles(user.getRoles());
            sessao.setToken(JWTCreator.create(KeyConfig.PREFIX, KeyConfig.KEY, jwtObject));
            return sessao;
        }else {
            throw new RuntimeException("Erro ao tentar fazer login");
        }
    }
}
