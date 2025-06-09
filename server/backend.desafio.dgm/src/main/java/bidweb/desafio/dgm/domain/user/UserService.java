package bidweb.desafio.dgm.domain.user;

import bidweb.desafio.dgm.domain.product.ProductRepository;
import bidweb.desafio.dgm.domain.sale.Sale;
import bidweb.desafio.dgm.domain.sale.dto.SaleRequestDTO;
import bidweb.desafio.dgm.domain.sale.dto.SaleResponseDTO;
import bidweb.desafio.dgm.domain.user.dto.UserRequestDTO;
import bidweb.desafio.dgm.domain.user.dto.UserResponseDTO;
import bidweb.desafio.dgm.infra.security.dto.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponseDTO create(UserRequestDTO request){
        User newUser = modelMapper.map(request, User.class);
        newUser.getRoles().add("USERS");
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);
        return modelMapper.map(newUser, UserResponseDTO.class);
    }

    public User findByUsername(Login login) {
        if (login == null || login.getUsername() == null) {
            return null;
        }

        System.out.println("Buscando user com username: " + login.getUsername());

        User user = userRepository.findByUsername(login.getUsername());

        if (user != null) {
            System.out.println("User encontrado: " + user.getUsername());
        } else {
            System.out.println("User não encontrado");
        }

        return user;
    }

//    public UserResponseDTO findByUsername(String username){
//        User newUser = userRepository.findByUsername(username);
//        return modelMapper.map(newUser, UserResponseDTO.class);
//    }
}
