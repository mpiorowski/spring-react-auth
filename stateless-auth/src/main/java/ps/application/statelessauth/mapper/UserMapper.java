package ps.application.statelessauth.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.stereotype.Component;
import ps.application.statelessauth.dao.User;

@Mapper
@Component
public interface UserMapper {

  @Insert("insert into users(name,email) values(#{name},#{email})")
  @SelectKey(statement = "call identity()", keyProperty = "id",
      before = false, resultType = Integer.class)
  void insertUser(User user);

  @Select("SELECT * FROM users")
  User selectAllUsers();
}
