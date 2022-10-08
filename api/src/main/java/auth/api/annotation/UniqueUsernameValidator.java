package auth.api.annotation;

import auth.api.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

  @Autowired
  private UserMapper userMapper;

  @Override
  public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
    return userMapper.findByUserName(s) == null;
  }
}
