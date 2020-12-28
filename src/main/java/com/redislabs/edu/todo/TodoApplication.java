package com.redislabs.edu.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import com.redislabs.edu.todo.domain.Todo;
import com.redislabs.edu.todo.repository.TodoRepository;

@SpringBootApplication
@EnableAutoConfiguration
public class TodoApplication {
  @Bean
  public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory connectionFactory) {
    RedisTemplate<?, ?> template = new RedisTemplate<>();
    template.setConnectionFactory(connectionFactory);
    return template;
  }
  
  @Bean
  public CommandLineRunner loadData(TodoRepository repository) {
    return args -> {
      repository.deleteAll();
      repository.save(Todo.builder().title("Wake up").build());
      repository.save(Todo.builder().title("Fall out of bed").build());
      repository.save(Todo.builder().title("Drag a comb across your head").build());
    };
  }

  public static void main(String[] args) {
    SpringApplication.run(TodoApplication.class, args);
  }

}
