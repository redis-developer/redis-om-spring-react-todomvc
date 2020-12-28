package com.redislabs.edu.todo.controllers;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redislabs.edu.todo.domain.Todo;
import com.redislabs.edu.todo.repository.TodoRepository;

@RestController
@RequestMapping("/todos")
public class TodosController {

  @Autowired
  private TodoRepository repository;

  @GetMapping
  public List<Todo> getAll() {
    List<Todo> todos = StreamSupport //
        .stream(repository.findAll().spliterator(), false) //
        .collect(Collectors.toList());
    
    return todos;
  }

}
