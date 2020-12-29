package com.redislabs.edu.todo.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.redislabs.edu.todo.domain.Todo;
import com.redislabs.edu.todo.repository.TodoRepository;

@CrossOrigin( //
    methods = { POST, GET, OPTIONS, DELETE, PATCH }, //
    maxAge = 3600, //
    allowedHeaders = { //
        "x-requested-with", "origin", "content-type", "accept", "accept-patch" //
    }, //
    origins = "*" //
)
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

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Todo create(@RequestBody Todo todo) {
    return repository.save(todo);
  }
  
  @DeleteMapping
  public void deleteAll() {
    repository.deleteAll();
  }

}
