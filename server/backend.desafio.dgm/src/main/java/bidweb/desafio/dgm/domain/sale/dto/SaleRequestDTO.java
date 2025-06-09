package bidweb.desafio.dgm.domain.sale.dto;

import bidweb.desafio.dgm.domain.product.dto.ProductRequestDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class SaleRequestDTO {
    @NotNull(message = "Produto é obrigatório")
    private ProductRequestDTO product;
    @NotNull(message = "Quantidade é obrigatório")
    private BigDecimal quantity;
    @NotNull(message = "Data é obrigatório")
    private LocalDate saleDate;
}
