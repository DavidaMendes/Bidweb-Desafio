package bidweb.desafio.dgm.config;

import bidweb.desafio.dgm.domain.user.User;
import bidweb.desafio.dgm.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class SecurityDatabaseService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username);
        if (user != null) {
            return buildUserDetails(user.getUsername(), user.getPassword(), user.getRoles());
        }

        throw new UsernameNotFoundException("Usuário não encontrado: " + username);
    }

    private UserDetails buildUserDetails(String username, String password, java.util.List<String> roles) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        roles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
        return new org.springframework.security.core.userdetails.User(username, password, authorities);
    }
}
