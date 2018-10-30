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
  @JsonProperty(value = "username", required = true)
  private String username;

  private String mail;

  @NotBlank
  @JsonProperty(value = "password", required = true)
  private String password;

  @NotBlank private String role = "admin";

  public User(
      Integer id,
      @NotBlank @Size(min = 1, max = 60) String username,
      String mail,
      @NotBlank String password,
      @NotBlank String role) {
    this.id = id;
    this.username = username;
    this.mail = mail;
    this.password = password;
    this.role = role;
  }

  @JsonCreator
  public User(
      @NotBlank @Size(min = 1, max = 60) String username,
      String mail,
      @NotBlank String password) {
    this.username = username;
    this.mail = mail;
    this.password = password;
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

  public String getMail() {
    return mail;
  }

  public void setMail(String mail) {
    this.mail = mail;
  }
}
