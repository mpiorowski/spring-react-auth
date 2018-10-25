package ps.application.auth.mapper;

import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.StatementType;
import org.springframework.stereotype.Component;
import ps.application.auth.dao.User;

import java.util.List;

@Mapper
@Component
public interface UserMapper {

  @Insert({"INSERT into users(username,password,role) VALUES(#{username},#{password},#{role})"})
  Integer insertUser(User user);

  @Select("SELECT * FROM users where username = #{username}")
  User findByUserUsername(String username);

  @Select("SELECT * FROM users")
  List<User> findAll();

  @Delete("DELETE FROM users")
  void deleteAllUsers();
}
