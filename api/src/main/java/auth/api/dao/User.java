package auth.api.dao;

import auth.api.annotation.UniqueUsername;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class User {

  private Integer userId;

  @NotBlank
  @Size(min = 1, max = 60)
  @UniqueUsername
  private String userName;

  @Email
  @Size(min = 1, max = 60)
  private String userEmail;

  @NotBlank
  @Size(min = 1, max = 60)
  private String userPassword;

  @NotBlank private String userRole;

  public User() {
    super();
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }

  public String getUserRole() {
    return userRole;
  }

  public void setUserRole(String userRole) {
    this.userRole = userRole;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  @Override
  public String toString() {
    return "User{"
        + "userId="
        + userId
        + ", userName='"
        + userName
        + '\''
        + ", userEmail='"
        + userEmail
        + '\''
        + ", userPassword='"
        + userPassword
        + '\''
        + ", userRole='"
        + userRole
        + '\''
        + '}';
  }
}
