package bidweb.desafio.dgm.domain.sale;

import bidweb.desafio.dgm.domain.product.Product;
import bidweb.desafio.dgm.domain.product.ProductService;
import bidweb.desafio.dgm.domain.sale.dto.SaleRequestDTO;
import bidweb.desafio.dgm.domain.sale.dto.SaleResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ModelMapper modelMapper;


    public SaleResponseDTO create(SaleRequestDTO request){
        Sale newSale = modelMapper.map(request, Sale.class);
        newSale = saleRepository.save(newSale);
        return modelMapper.map(newSale, SaleResponseDTO.class);
    }

    public List<SaleResponseDTO> getAll() {
        return saleRepository.findAll()
                .stream()
                .map(sale -> modelMapper.map(sale, SaleResponseDTO.class))
                .toList();
    }

    public SaleResponseDTO getById(Long id){
        return modelMapper.map(saleRepository.findById(id).get(),SaleResponseDTO.class);
    }

    public void delete(Long id){
        var existingSale = saleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Venda não encontrado."));
        saleRepository.delete(existingSale);
    }

    public SaleResponseDTO update(Long id, SaleRequestDTO request) {
        Sale existingSale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Venda com ID " + id + " não encontrada."));

        existingSale.setProduct(modelMapper.map(request.getProduct(), Product.class));
        existingSale.setQuantity(request.getQuantity().intValue());
        existingSale.setSaleDate(request.getSaleDate());
        existingSale.setTotalValue(
                request.getProduct().getUnitPrice().multiply(request.getQuantity())
        );

        Sale updatedSale = saleRepository.save(existingSale);
        return modelMapper.map(updatedSale, SaleResponseDTO.class);
    }

}
