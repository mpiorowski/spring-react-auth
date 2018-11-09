package auth.api.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationException implements AuthenticationEntryPoint {

  private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationException.class);

  @Override
  public void commence(
      HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse,
      AuthenticationException e)
      throws IOException {
    LOGGER.error("Responding with unauthorized error. Message - {}", e.getMessage());
    httpServletResponse.sendError(
        HttpServletResponse.SC_UNAUTHORIZED,
        "Sorry, you are not authorized to access this resource.");
  }
}
