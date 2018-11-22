package auth.api.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import auth.api.dao.Product;

import java.util.List;

@Mapper
@Component
public interface ProductMapper {

  @Update({
    "INSERT INTO products (product_id, product_name, product_price, product_available) VALUES(#{productId}, #{productName},#{productPrice},#{productAvailable})"
        + " ON CONFLICT (product_id) DO "
        + "UPDATE set product_name = #{productName}, product_price = #{productPrice}, product_available = #{productAvailable}"
  })
  void insertOrUpdateProduct(Product product);

  @Select("SELECT * FROM products order by product_id")
  List<Product> findAllProducts();

  @Delete("DELETE FROM products where product_id = #{productId}")
  void deleteProduct(Integer productId);
}
