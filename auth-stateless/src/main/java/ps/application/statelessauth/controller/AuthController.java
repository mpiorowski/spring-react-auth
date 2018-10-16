package ps.application.statelessauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ps.application.statelessauth.payload.JwtAuthenticationResponse;
import ps.application.statelessauth.security.JwtTokenProvider;

import javax.validation.Valid;

@RestController
public class AuthController {

  private final JwtTokenProvider jwtTokenProvider;

  private final AuthenticationManager authenticationManager;

  @Autowired
  public AuthController(
      JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.authenticationManager = authenticationManager;
  }

  @GetMapping("/auth")
  public ResponseEntity auth(
      @Valid @RequestParam String username, @Valid @RequestParam String password) {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtTokenProvider.generateToken(authentication);

    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }
}
