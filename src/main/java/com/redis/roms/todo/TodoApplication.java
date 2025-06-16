package com.redis.roms.todo;

import com.redis.om.spring.annotations.EnableRedisDocumentRepositories;
import com.redis.roms.todo.repository.TodoRepository;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableRedisDocumentRepositories
public class TodoApplication {

  @Bean
  public CommandLineRunner loadData(TodoRepository repository) {
    return args -> {
      repository.deleteAll();
      // repository.save(Todo.builder().title("Wake up").build());
      // repository.save(Todo.builder().title("Fall out of bed").build());
      // repository.save(Todo.builder().title("Drag a comb across your head").build());
    };
  }

  @Bean
  public OpenAPI apiInfo() {
    return new OpenAPI().info(new Info().title("Redis OM ToDos").version("1.0.0"));
  }

  @Bean
  public GroupedOpenApi httpApi() {
    return GroupedOpenApi.builder()
        .group("http")
        .pathsToMatch("/**")
        .build();
  }

  public static void main(String[] args) {
    SpringApplication.run(TodoApplication.class, args);
  }

}
