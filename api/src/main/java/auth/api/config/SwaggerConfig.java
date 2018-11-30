package auth.api.config;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.function.Predicate;

@Configuration
@EnableSwagger2
@Profile({"dev", "default"})
public class SwaggerConfig {

  @Bean
  public Docket produceApi() {
    return new Docket(DocumentationType.SWAGGER_2)
        .apiInfo(apiInfo())
        .select()
        .apis(RequestHandlerSelectors.basePackage("auth.api.controller"))
        .paths(paths()::apply)
        .build()
        .securitySchemes(Lists.newArrayList(apiKey()));
  }

  @Bean
  SecurityScheme apiKey() {
    return new ApiKey("Authorization", "Bearer", "header");
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
        .title("Stateless Auth APIs")
        .description("This page lists all the rest apis for Stateless Auth App.")
        .version("1.0-SNAPSHOT")
        .build();
  }

  // Only select apis that matches the given Predicates.
  private Predicate<String> paths() {
    // Match all paths except /error
    return ((Predicate<String>) PathSelectors.regex("/api/**")::apply)
        .and(((Predicate<String>) PathSelectors.regex("/error.*")::apply).negate());
  }
}
