package ps.application.statelessauth.dao;

public class User {

  private Integer id;
  private String name;
  private String role;

  public User(Integer id, String name, String role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  public User(String name, String role) {
    this.name = name;
    this.role = role;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
