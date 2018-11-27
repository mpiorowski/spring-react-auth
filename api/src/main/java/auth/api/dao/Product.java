package auth.api.dao;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;

public class Product {

  private int productId;

  @NotBlank
  @Size(max = 200)
  private String productName;

  @Range(min = 1, max = 999)
  private double productPrice;

  @NotNull private boolean productAvailable;

  @JsonCreator
  public Product(
      @JsonProperty(value = "productId")
          int productId,
      @JsonProperty(value = "productName", required = true) @NotBlank @Size(max = 200)
          String productName,
      @JsonProperty(value = "productPrice", required = true) @NotBlank @Range(min = 1, max = 999)
          double productPrice,
      @JsonProperty(value = "productAvailable", required = true) @NotNull boolean productAvailable) {
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productAvailable = productAvailable;
  }

  @Override
  public String toString() {
    return "Product{"
        + "productId="
        + productId
        + ", productName='"
        + productName
        + '\''
        + ", productPrice="
        + productPrice
        + ", productAvailable="
        + productAvailable
        + '}';
  }

  public int getProductId() {
    return productId;
  }

  public void setProductId(int productId) {
    this.productId = productId;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public double getProductPrice() {
    return productPrice;
  }

  public void setProductPrice(float productPrice) {
    this.productPrice = productPrice;
  }

  public boolean isProductAvailable() {
    return productAvailable;
  }

  public void setProductAvailable(boolean productAvailable) {
    this.productAvailable = productAvailable;
  }
}
