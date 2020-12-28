package com.redislabs.edu.todo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@RedisHash
public class Todo {
  @Id
  private Long id;

  @Setter
  private String title;

  @Setter
  @Default
  private Boolean completed = false;

  @Setter
  private Long order;
  
  @Setter
  private String url;
  
}
