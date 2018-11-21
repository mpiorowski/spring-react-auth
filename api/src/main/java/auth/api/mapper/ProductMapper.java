package auth.api.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import auth.api.dao.Product;

import java.util.List;

@Mapper
@Component
public interface ProductMapper {

  @Insert({"INSERT into products(productName,productPrice,productAvailable) VALUES(#{productName},#{productPrice},#{productAvailability})"})
  void insertProduct(Product product);

  @Update({
      "INSERT INTO products (productId, productName,productPrice,productAvailable) VALUES(#{productId}, #{productName},#{productPrice},#{productAvailable})" +
          " ON CONFLICT (productId) DO " +
          "UPDATE set productName = #{productName}, productPrice = #{productPrice}, productAvailable = #{productAvailable}"
  })
  void insertOrUpdateProduct(Product product);

  @Select("SELECT * FROM products order by productId")
  List<Product> findAllProducts();

  @Delete("DELETE FROM products where productId = #{productId}")
  void deleteProduct(Integer productId);

  @Delete("DELETE FROM products")
  void deleteAllProducts();

}
