package ps.application.auth.security;

import org.apache.ibatis.session.SqlSessionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ps.application.auth.mapper.UserMapper;
import ps.application.auth.dao.User;

@Component
public class CustomUserDetailsService implements UserDetailsService {

  private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);
  private final UserMapper userMapper;

  @Autowired
  public CustomUserDetailsService(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) {

      User user = userMapper.findByUserUsername(username);
      if (user == null) {
        throw new UsernameNotFoundException("User not found with username");
      } else {
        return new MyUserPrincipal(user);
      }

  }
}
