package bidweb.desafio.dgm.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRequestDTO {
    @NotBlank(message = "Nome de usuário é obrigatorio")
    private String username;
    @NotBlank(message = "Senha é obrigatorio")
    private String password;
}
