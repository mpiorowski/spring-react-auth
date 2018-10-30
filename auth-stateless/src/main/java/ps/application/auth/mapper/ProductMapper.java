package ps.application.auth.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;
import ps.application.auth.dao.Product;

import java.util.List;

@Mapper
@Component
public interface ProductMapper {

  @Insert({"INSERT into products(product_name,product_price,product_availability) VALUES(#{productName},#{price},#{available})"})
  void insertProduct(Product product);

  @Select("SELECT * FROM products")
  List<Product> findAllProducts();

  @Delete("DELETE FROM products")
  void deleteAllProducts();

}
