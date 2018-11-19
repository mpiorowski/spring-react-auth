package auth.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import auth.api.dao.User;
import auth.api.mapper.UserMapper;
import auth.api.traffic.UserRequest;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@Api(value = "/user", description = "Users operations", produces = "application/json")
public class UserController {

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Autowired PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @GetMapping("/all")
  @ApiOperation(value = "return all users")
  @ApiResponses(value ={
    @ApiResponse(code=200, message = "All users returned"),
    @ApiResponse(code=500, message="Internal Server Error"),
    @ApiResponse(code=404, message="User not found")
  })
  public ResponseEntity allUsers() {
    return ResponseEntity.ok(userMapper.findAll());
  }

  @PostMapping("/add")
  @Transactional
  public ResponseEntity addUser(@Valid @RequestBody UserRequest userRequest) {
    try {
      User user = userRequest.getUser();
      user.setPassword(passwordEncoder().encode(user.getPassword()));
      userMapper.insertUser(user);
    } catch (NullPointerException e) {
      return ResponseEntity.ok(e.getMessage());
    }
    return ResponseEntity.ok("true");
  }

  @CrossOrigin
  @DeleteMapping("/delete")
  @Transactional
  public ResponseEntity deleteUser(@RequestBody Integer userId) {
    try {
      userMapper.deleteUser(userId);
    } catch (NullPointerException e) {
      return ResponseEntity.ok(e.getMessage());
    }
    return ResponseEntity.ok("true");
  }
}
