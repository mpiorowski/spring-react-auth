package auth.api.traffic;

import auth.api.dao.User;
import javax.validation.Valid;

public class UserRequest {

  @Valid
  private User user;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
