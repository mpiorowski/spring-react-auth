package ps.application.auth.traffic;

import ps.application.auth.dao.User;

import java.util.List;

public class UserRequest {

  private List<User> users;

  public void setUsers(List<User> users) {
    this.users = users;
  }

  public List<User> getUsers() {
    return users;
  }
}
