package bidweb.desafio.dgm.domain.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
@Data
public class ProductRequestDTO {
    @NotBlank(message = "Nome não pode estar em branco")
    private String name;
    @NotNull(message = "Preço por unidade é obrigatório")
    private BigDecimal unitPrice;
}
