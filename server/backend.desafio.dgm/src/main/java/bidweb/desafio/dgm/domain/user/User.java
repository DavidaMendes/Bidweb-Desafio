package bidweb.desafio.dgm.domain.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "usuarios")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_de_usuario", length = 100, nullable = false)
    private String username;

    @Column(name = "senha", length = 300, nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tabela_usuario_roles", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "role_id")
    private List<String> roles = new ArrayList<>();
}
