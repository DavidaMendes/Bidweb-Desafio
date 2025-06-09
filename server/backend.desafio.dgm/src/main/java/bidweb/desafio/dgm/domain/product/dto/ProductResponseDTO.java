package bidweb.desafio.dgm.domain.product.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private BigDecimal unitPrice;
}
