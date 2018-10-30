package ps.application.auth.dao;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Product {

  private int id;

  @NotBlank
  @Size(max = 160)
  private String productName;

  @NotBlank
  @Min(1)
  @Max(999)
  private double price;

  @NotBlank private boolean available;


  public Product(
      int id,
      @NotBlank @Size(max = 160) String productName,
      @NotBlank @Min(1) @Max(999) double price,
      @NotBlank boolean available) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.available = available;
  }

  @JsonCreator
  public Product(
      @JsonProperty(value = "productName", required = true) @NotBlank @Size(max = 160)
          String productName,
      @JsonProperty(value = "price", required = true) @NotBlank @Min(1) @Max(999) double price,
      @JsonProperty(value = "available", required = true) @NotBlank boolean available) {
    this.productName = productName;
    this.price = price;
    this.available = available;
  }

  @Override
  public String toString() {
    return "Product{" +
        "id=" + id +
        ", productName='" + productName + '\'' +
        ", price=" + price +
        ", available=" + available +
        '}';
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
