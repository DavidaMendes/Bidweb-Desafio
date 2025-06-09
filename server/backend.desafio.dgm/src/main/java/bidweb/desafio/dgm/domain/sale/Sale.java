package bidweb.desafio.dgm.domain.sale;

import bidweb.desafio.dgm.domain.product.Product;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "vendas")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantidade",length = 100, nullable = false)
    private Integer quantity;

    @Column(name = "data_da_venda", nullable = false)
    private LocalDate saleDate;

    @Column(name = "total_da_venda")
    private BigDecimal totalValue;

    @PrePersist @PreUpdate
    private void calcTotal() {
        if (totalValue == null && product != null) {
            totalValue = product.getUnitPrice().multiply(BigDecimal.valueOf(quantity));
        }
    }

}
