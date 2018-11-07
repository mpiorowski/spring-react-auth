package ps.application.auth;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import ps.application.auth.dao.User;
import ps.application.auth.mapper.UserMapper;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class StatelessAuthApplicationTests {

  @Autowired
  private UserMapper userMapper;

  @Test
  public void contextLoads() {

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    User user = userMapper.findByUserUsername("mat");
    assertThat(user.getUsername()).isEqualTo("mat");
    assertThat(user.getRole()).isEqualTo("admin");
    assertThat(user.getEmail()).isEqualTo("mat@gmail.com");

    assertThat(encoder.matches("pass", user.getPassword())).isTrue();

  }
}
