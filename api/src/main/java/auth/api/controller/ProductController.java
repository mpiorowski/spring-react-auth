package auth.api.controller;

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

@RestController
@RequestMapping("/product")
public class ProductController {

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
  public ResponseEntity insertProduct(@Valid @RequestBody ProductRequest productRequest) {

    productMapper.deleteAllProducts();
    for (Product product : productRequest.getProducts()) {
      productMapper.insertProduct(product);
    }
    return ResponseEntity.ok(true);
  }
}
