package auth.api.mapper;

import auth.api.dao.User;
import auth.api.traffic.UserUpdate;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {

  @Insert({"INSERT into users(user_name,user_email,user_password,user_role) VALUES(#{userName},#{userEmail},#{userPassword},#{userRole})"})
  void insertUser(User user);

  @Update({"UPDATE users set user_name = #{userName}, user_email = #{userEmail}, user_role = #{userRole} where user_id = #{userId}"})
  void updateUser(UserUpdate userUpdate);

  @Select("SELECT " +
      "user_id as userId, " +
      "user_name as userName, " +
      "user_email as userEmail, " +
      "user_password as userPassword, " +
      "user_role as userRole " +
      "FROM users where user_name = #{userName}")
  User findByUserName(String userName);

  @Select("SELECT " +
      "user_id as userId, " +
      "user_name as userName, " +
      "user_email as userEmail, " +
      "user_role as userRole " +
      " FROM users order by user_id")
  List<User> findAll();

  @Delete("DELETE FROM users where user_id = #{userId}")
  void deleteUser(Integer userId);
}
