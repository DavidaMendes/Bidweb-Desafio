package bidweb.desafio.dgm.domain.product;

import bidweb.desafio.dgm.domain.product.dto.ProductRequestDTO;
import bidweb.desafio.dgm.domain.product.dto.ProductResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ProductResponseDTO create(ProductRequestDTO request){
        Product newProduct = modelMapper.map(request,Product.class);
        productRepository.save(newProduct);
        return modelMapper.map(newProduct, ProductResponseDTO.class);
    }

}
