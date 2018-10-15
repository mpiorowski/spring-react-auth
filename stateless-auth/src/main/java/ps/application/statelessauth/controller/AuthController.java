package ps.application.statelessauth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.application.statelessauth.payload.JwtAuthenticationResponse;
import ps.application.statelessauth.security.JwtTokenProvider;

@RestController
public class AuthController {

  private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

  private final JwtTokenProvider jwtTokenProvider;

  private final AuthenticationManager authenticationManager;

  @Autowired
  public AuthController(
      JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.authenticationManager = authenticationManager;
  }

  @GetMapping("/auth")
  public ResponseEntity auth() {

    LOGGER.info("here");

    Authentication authentication =
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("mat", "pass"));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtTokenProvider.generateToken(authentication);
    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }
}
