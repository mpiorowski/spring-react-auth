package auth.api;

import auth.api.dao.User;
import auth.api.mapper.UserMapper;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureEmbeddedDatabase
public class StatelessAuthApplicationTests {

  @Autowired
  private UserMapper userMapper;

  @Test
  public void contextLoads() {

    User user = userMapper.findByUserUsername("mat");
    assertThat(user.getUsername()).isEqualTo("mat");
    assertThat(user.getRole()).isEqualTo("admin");
    assertThat(user.getEmail()).isEqualTo("mat@gmail.com");

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    assertThat(user.getPassword().equals("pass")).isFalse();
    assertThat(encoder.matches("pass", user.getPassword())).isTrue();

  }
}
