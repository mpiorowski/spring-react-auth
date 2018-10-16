package ps.application.statelessauth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ps.application.statelessauth.dao.User;
import ps.application.statelessauth.mapper.UserMapper;

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
    User user = userMapper.findByUserUsername(username);
    return new MyUserPrincipal(user);

  }
}
