package auth.api.controller;

import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import auth.api.dao.Product;
import auth.api.mapper.ProductMapper;
import auth.api.traffic.ProductRequest;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
@Api(value = "/product", description = "Products operations", produces = "application/json")
public class ProductController {

  private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

  private final ProductMapper productMapper;

  @Autowired
  public ProductController(ProductMapper productMapper) {
    this.productMapper = productMapper;
  }

  @GetMapping("/all")
  public ResponseEntity allProducts() {
    return ResponseEntity.ok(productMapper.findAllProducts());
  }

  @Transactional
  @PostMapping("/add")
  public ResponseEntity insertOrUpdateProduct(@Valid @RequestBody ProductRequest productRequest) {

    for (Product product : productRequest.getProducts()) {
      productMapper.insertOrUpdateProduct(product);
    }
    return ResponseEntity.ok(true);
  }

  @Transactional
  @DeleteMapping("/delete")
  @CrossOrigin
  public ResponseEntity deleteProduct(@Valid @RequestBody List<String> productIdArray) {

    for (String productId : productIdArray) {
      productMapper.deleteProduct(Integer.valueOf(productId));
    }

    return ResponseEntity.ok(true);
  }
}
