package auth.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import auth.api.traffic.JwtAuthenticationResponse;
import auth.api.traffic.LoginRequest;
import auth.api.security.JwtTokenProvider;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final JwtTokenProvider jwtTokenProvider;
  private final AuthenticationManager authenticationManager;
  @Autowired
  public AuthController(
      JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.authenticationManager = authenticationManager;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @PostMapping("/login")
  public ResponseEntity auth(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtTokenProvider.generateToken(authentication);

    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
  }

  @GetMapping("/user")
  public ResponseEntity auth(Principal user) {
    return ResponseEntity.ok(user);
  }
}
