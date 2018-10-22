package ps.application.auth.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.stereotype.Component;
import ps.application.auth.dao.User;

@Mapper
@Component
public interface UserMapper {

  @Insert("insert into users(name,password,role) values(#{name},#{password},#{role})")
  @SelectKey(statement = "call identity()", keyProperty = "id",
      before = false, resultType = Integer.class)
  void insertUser(User user);

  @Select("SELECT * FROM users where name = #{name}")
  User findByUserUsername(String name);

  @Select("SELECT * FROM users")
  User findAll();
}
