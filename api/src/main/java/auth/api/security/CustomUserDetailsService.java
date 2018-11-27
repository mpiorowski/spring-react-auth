package auth.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import auth.api.mapper.UserMapper;
import auth.api.dao.User;

@Component
public class CustomUserDetailsService implements UserDetailsService {

  private final UserMapper userMapper;

  @Autowired
  public CustomUserDetailsService(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) {

      User user = userMapper.findByUserName(username);
      if (user == null) {
        throw new UsernameNotFoundException("User not found with username");
      } else {
        return new CustomUserPrincipal(user);
      }

  }
}
