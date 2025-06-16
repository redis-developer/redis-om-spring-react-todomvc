package com.redis.roms.todo.domain;

import org.springframework.data.annotation.Id;

import com.redis.om.spring.annotations.Document;

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
@Document
public class Todo {
  @Id
  private String id;

  @Setter
  private String title;

  @Setter
  @Default
  private Boolean completed = false;

  @Setter
  private Long order;
  
  @Setter
  private String url;
  
  public Todo updateWith(Todo update) {
    if (update.getCompleted() != null) {
      setCompleted(update.getCompleted());
    }
    
    if (update.getOrder() != null) {
      setOrder(update.getOrder());
    }
    
    if (update.getTitle() != null) {
      setTitle(update.getTitle());
    }
    
    return this;
  }
}
