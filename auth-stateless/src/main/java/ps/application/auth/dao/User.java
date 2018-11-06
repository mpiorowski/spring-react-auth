package ps.application.auth.dao;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class User {

  private Integer id;

  @NotBlank
  @Size(min = 1, max = 60)
  private String username;

  @NotBlank @Email private String email;

  @NotBlank private String password;

  @NotBlank private String role;

  public User(
      Integer id,
      @NotBlank @Size(min = 1, max = 60) String username,
      String email,
      @NotBlank String password,
      @NotBlank String role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  @JsonCreator
  public User(
      @JsonProperty(value = "username", required = true) @NotBlank @Size(min = 1, max = 60)
          String username,
      @JsonProperty(value = "email", required = true) @NotBlank @Email String email,
      @JsonProperty(value = "password", required = true) @NotBlank String password,
      @JsonProperty(value = "role", required = true) @NotBlank String role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
