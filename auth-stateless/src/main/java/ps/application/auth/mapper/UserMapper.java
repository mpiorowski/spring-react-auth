package ps.application.auth.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import ps.application.auth.dao.User;

import java.util.List;

@Mapper
@Component
public interface UserMapper {

  @Insert("INSERT into users(name,password,role) VALUES(#{name},#{password},#{role})")
  @SelectKey(statement = "call identity()", keyProperty = "id",
      before = false, resultType = Integer.class)
  void insertUser(User user);

  @Select("SELECT * FROM users where name = #{name}")
  User findByUserUsername(String name);

  @Select("SELECT * FROM users")
  List<User> findAll();

  @Delete("DELETE * FROM users")
  void deleteAllUsers();
}
