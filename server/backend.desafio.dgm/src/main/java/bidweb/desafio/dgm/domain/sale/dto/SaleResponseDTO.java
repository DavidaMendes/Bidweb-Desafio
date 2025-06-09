package bidweb.desafio.dgm.domain.sale.dto;

import bidweb.desafio.dgm.domain.product.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class SaleResponseDTO {
    private Long id;
    private Product product;
    private Integer quantity;
    private LocalDate saleDate;
    private BigDecimal totalValue;
}
