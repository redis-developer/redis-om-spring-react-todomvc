package com.redislabs.edu.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import com.redis.om.spring.annotations.EnableRedisDocumentRepositories;
import com.redislabs.edu.todo.repository.TodoRepository;

@SpringBootApplication
@EnableRedisDocumentRepositories
@EnableSwagger2
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
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
        .select()
        .apis(RequestHandlerSelectors.any())
        .paths(PathSelectors.any())
        .build();
  }

  public static void main(String[] args) {
    SpringApplication.run(TodoApplication.class, args);
  }

}
