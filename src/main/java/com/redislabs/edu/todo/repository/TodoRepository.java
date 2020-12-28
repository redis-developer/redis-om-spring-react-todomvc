package com.redislabs.edu.todo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.redislabs.edu.todo.domain.Todo;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
}
