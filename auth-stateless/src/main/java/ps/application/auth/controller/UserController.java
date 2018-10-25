package ps.application.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ps.application.auth.dao.User;
import ps.application.auth.dao.UserList;
import ps.application.auth.mapper.UserMapper;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @GetMapping("/auth")
  public Principal auth(Principal user) {
    return user;
  }

  @GetMapping("/all")
  public ResponseEntity allUsers() {
    return ResponseEntity.ok(userMapper.findAll());
  }

  @PostMapping("/add")
  @Transactional
  public ResponseEntity addUsers(@Valid @RequestBody UserList users) {
    try {
      userMapper.deleteAllUsers();
      for (User user : users.getUsers()) {
        userMapper.insertUser(user);
      }
    } catch (NullPointerException e) {
      return ResponseEntity.ok(e.getMessage());
    }
    return ResponseEntity.ok("true");
  }
}
