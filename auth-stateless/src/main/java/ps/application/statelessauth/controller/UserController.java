package ps.application.statelessauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.application.statelessauth.dao.User;
import ps.application.statelessauth.mapper.UserMapper;

import java.security.Principal;

@RestController
public class UserController {

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @GetMapping("/alluser")
  public User alluser() {
    return userMapper.findByUserUsername("mat");
  }

  @GetMapping("/user")
  public Principal user(Principal user) {
    return user;
  }
}
