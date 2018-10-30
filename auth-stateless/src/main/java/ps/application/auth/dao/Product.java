package ps.application.auth.dao;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;

public class Product {

  private int id;

  @NotBlank
  @Size(max = 200)
  private String productName;

  @Range(min = 1, max = 999)
  private double price;

  @NotNull private boolean available;

  public Product(
      int id,
      @NotBlank @Size(max = 200) String productName,
      @NotBlank @Range(min = 1, max = 999) double price,
      @NotNull boolean available) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.available = available;
  }

  @JsonCreator
  public Product(
      @JsonProperty(value = "productName", required = true) @NotBlank @Size(max = 200)
          String productName,
      @JsonProperty(value = "price", required = true) @NotBlank @Range(min = 1, max = 999)
          double price,
      @JsonProperty(value = "available", required = true) @NotNull boolean available) {
    this.productName = productName;
    this.price = price;
    this.available = available;
  }

  @Override
  public String toString() {
    return "Product{"
        + "id="
        + id
        + ", productName='"
        + productName
        + '\''
        + ", price="
        + price
        + ", available="
        + available
        + '}';
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(float price) {
    this.price = price;
  }

  public boolean isAvailable() {
    return available;
  }

  public void setAvailable(boolean available) {
    this.available = available;
  }
}
