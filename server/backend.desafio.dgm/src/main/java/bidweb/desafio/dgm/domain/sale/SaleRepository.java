package bidweb.desafio.dgm.domain.sale;

import bidweb.desafio.dgm.domain.sale.dto.SaleResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
