package bidweb.desafio.dgm.infra.security.jwt;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class JWTObject {
    private String subject; //nome de usuário
    private Date issueedAT; //Data de expedição
    private Date expiration; //Data de expiração
    private List<String> roles; //Perfis de acesso
}
