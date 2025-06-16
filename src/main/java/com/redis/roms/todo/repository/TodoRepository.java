package com.redis.roms.todo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.redis.roms.todo.domain.Todo;

@Repository
public interface TodoRepository extends CrudRepository<Todo, String> {
}
