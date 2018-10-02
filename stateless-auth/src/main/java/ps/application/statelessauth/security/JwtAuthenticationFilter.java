package ps.application.statelessauth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter {

  @Autowired
  JwtTokenProvider jwtTokenProvider;


}
