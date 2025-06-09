package bidweb.desafio.dgm.infra.security.dto;

import lombok.Data;

@Data
public class Sessao {
    private String login;
    private String token;
}
