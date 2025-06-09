package bidweb.desafio.dgm.domain.sale;

import bidweb.desafio.dgm.domain.sale.dto.SaleRequestDTO;
import bidweb.desafio.dgm.domain.sale.dto.SaleResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleResponseDTO>> getAll() {
        return ResponseEntity.ok(saleService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(saleService.getById(id));
    }

    @PostMapping
    public ResponseEntity<SaleResponseDTO> create(@RequestBody @Valid SaleRequestDTO request) {
        SaleResponseDTO response = saleService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SaleResponseDTO> update(@PathVariable Long id, @RequestBody @Valid SaleRequestDTO request) {
        SaleResponseDTO updated = saleService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        saleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

