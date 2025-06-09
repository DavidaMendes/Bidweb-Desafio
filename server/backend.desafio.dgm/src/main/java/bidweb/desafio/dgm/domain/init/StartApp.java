package bidweb.desafio.dgm.domain.init;

import bidweb.desafio.dgm.domain.product.Product;
import bidweb.desafio.dgm.domain.product.ProductRepository;
import bidweb.desafio.dgm.domain.product.ProductService;
import bidweb.desafio.dgm.domain.product.dto.ProductRequestDTO;
import bidweb.desafio.dgm.domain.sale.SaleService;
import bidweb.desafio.dgm.domain.sale.dto.SaleRequestDTO;
import bidweb.desafio.dgm.domain.user.User;
import bidweb.desafio.dgm.domain.user.UserRepository;
import bidweb.desafio.dgm.domain.user.UserService;
import bidweb.desafio.dgm.domain.user.dto.UserRequestDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class StartApp implements CommandLineRunner {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SaleService saleService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void run(String... args) throws Exception {
        User userExisting = userRepository.findByUsername("admin");
        if (userExisting == null) {
            UserRequestDTO userDefault = new UserRequestDTO();
            userDefault.setUsername("admin");
            userDefault.setPassword("senha123");
            userService.create(userDefault);
        }

        // Produtos e Vendas
        ProductRequestDTO camisa = new ProductRequestDTO();
        camisa.setName("Camisa");
        camisa.setUnitPrice(new BigDecimal("49.90"));

        ProductRequestDTO bone = new ProductRequestDTO();
        bone.setName("Boné");
        bone.setUnitPrice(new BigDecimal("29.90"));

        SaleRequestDTO sale1 = new SaleRequestDTO();
        sale1.setProduct(camisa);
        sale1.setQuantity(BigDecimal.valueOf(2));
        sale1.setSaleDate(LocalDate.now().minusDays(1));
        saleService.create(sale1);

        SaleRequestDTO sale2 = new SaleRequestDTO();
        sale2.setProduct(bone);
        sale2.setQuantity(BigDecimal.valueOf(1));
        sale2.setSaleDate(LocalDate.now());
        saleService.create(sale2);
    }
}
