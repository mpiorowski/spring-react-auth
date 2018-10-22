package ps.application.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.application.auth.dao.User;
import ps.application.auth.mapper.UserMapper;

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
    return userMapper.findAll();
  }

  @GetMapping("/user")
  public Principal user(Principal user) {
    return user;
  }

  @GetMapping("/checkuser")
  public String checkUser() {
    User user = userMapper.findByUserUsername("ww");
    if (user == null) {
      return "EMPTY";
    } else {
      return user.getUsername();
    }

  }
}
