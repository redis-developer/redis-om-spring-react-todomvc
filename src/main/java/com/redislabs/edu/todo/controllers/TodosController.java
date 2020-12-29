package com.redislabs.edu.todo.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    Todo saved = repository.save(todo);
    String url = linkTo(methodOn(this.getClass()) //
        .get(saved.getId())) //
            .withSelfRel() //
            .getHref();

    saved.setUrl(url);
    repository.save(saved);

    return saved;
  }

  @DeleteMapping
  public void deleteAll() {
    repository.deleteAll();
  }

  @GetMapping("/{id}")
  public Todo get(@PathVariable("id") Long id) {
    return repository.findById(id).get();
  }
  
  @PatchMapping("/{id}")
  public Todo update(@PathVariable("id") Long id, @RequestBody Todo update) {
    Todo todo = repository.findById(id).get().updateWith(update);

    return repository.save(todo);
  }
  
  @DeleteMapping("/{id}")
  public void delete(@PathVariable("id") Long id) {
    repository.deleteById(id);
  }

}
