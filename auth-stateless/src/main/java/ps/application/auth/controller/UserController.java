package ps.application.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ps.application.auth.dao.User;
import ps.application.auth.mapper.UserMapper;
import ps.application.auth.traffic.UserRequest;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @GetMapping("/all")
  public ResponseEntity allUsers() {
    return ResponseEntity.ok(userMapper.findAll());
  }

  @PostMapping("/add")
  @Transactional
  public ResponseEntity addUser(@Valid @RequestBody UserRequest user) {
    try {
      userMapper.insertUser(user.getUser());
    } catch (NullPointerException e) {
      return ResponseEntity.ok(e.getMessage());
    }
    return ResponseEntity.ok("true");
  }
}
