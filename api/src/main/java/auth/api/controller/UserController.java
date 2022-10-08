package auth.api.controller;

import auth.api.dao.User;
import auth.api.exception.AppException;
import auth.api.mapper.UserMapper;
import auth.api.traffic.UserUpdate;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/user")
@Api(value = "/user", produces = "application/json")
public class UserController {

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @GetMapping("/all")
  @ApiOperation(value = "return all users")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "All users returned"),
        @ApiResponse(code = 500, message = "Internal Server Error"),
        @ApiResponse(code = 404, message = "User not found")
      })
  public ResponseEntity allUsers() {
    return ResponseEntity.ok(userMapper.findAll());
  }

  @PostMapping("/add")
  @Transactional
  public ResponseEntity addUser(@Valid @RequestBody User user) {
    try {
      user.setUserPassword(passwordEncoder().encode(user.getUserPassword()));
      userMapper.insertUser(user);
      Integer userId = userMapper.findByUserName(user.getUserName()).getUserId();
      return ResponseEntity.ok(userId);

    } catch (NullPointerException e) {
      return ResponseEntity.ok(e);
    }
  }

  @CrossOrigin
  @PutMapping("/update")
  @Transactional
  public ResponseEntity updateUser(@Valid @RequestBody UserUpdate userUpdate) {
    try {
      userMapper.updateUser(userUpdate);
      return ResponseEntity.ok("true");
    } catch (NullPointerException e) {
      return ResponseEntity.ok(e.getMessage());
    }
  }

  @CrossOrigin
  @DeleteMapping("/delete")
  @Transactional
  public ResponseEntity deleteUser(@Valid @RequestBody Integer userId) {
    try {
      userMapper.deleteUser(userId);
      return ResponseEntity.ok("true");
    } catch (NullPointerException e) {
      return ResponseEntity.ok(e.getMessage());
    }
  }
}
