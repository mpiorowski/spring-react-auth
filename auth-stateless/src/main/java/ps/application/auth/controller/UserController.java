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
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  private final UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @GetMapping("/allusers")
  public List<User> allusers() {
    return userMapper.findAll();
  }

  @GetMapping("/user")
  public Principal user(Principal user) {
    return user;
  }

  @PostMapping("/addusers")
  @Transactional
  public ResponseEntity addusers(@Valid @RequestBody UserList users) {

    List<Integer> ids = new ArrayList<>();
    Integer id;

    try{

      userMapper.deleteAllUsers();

      for (User user : users.getUsers()) {
        id = userMapper.insertUser(user);
        ids.add(id);
        logger.info(ids.toString());
        logger.info(String.valueOf(id));
      }
    } catch (NullPointerException e){
      return ResponseEntity.ok(e.getMessage());
    }

    return ResponseEntity.ok(ids);

  }

}
