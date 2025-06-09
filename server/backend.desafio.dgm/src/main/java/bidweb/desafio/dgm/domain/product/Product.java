package bidweb.desafio.dgm.domain.product;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "produtos")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    private String name;

    @Column(name = "preco_por_unidade", length = 50, nullable = false)
    private BigDecimal unitPrice;
}
