package com.redislabs.edu.todo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.atLeast;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;

import com.redislabs.edu.todo.domain.Todo;
import com.redislabs.edu.todo.repository.TodoRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class TodosApiTests {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private TodoRepository todoRepository;

  @Test
  public void testGivenNoTodosGetAllReturnsEmptyArray() throws Exception {
    mvc.perform(get("/todos")) //
        .andExpect(status().isOk()) //
        .andExpect(content().string("[]"));
  }

  @Test
  public void testGivenTodosGetAllReturnsAJsonArrayOfTodos() throws Exception {

    Todo todo1 = Todo.builder().title("Wake up").build();
    Todo todo2 = Todo.builder().title("Fall out of bed").build();
    Todo todo3 = Todo.builder().title("Drag a comb across your head").build();

    List<Todo> allTodos = new ArrayList<Todo>();
    allTodos.add(todo1);
    allTodos.add(todo2);
    allTodos.add(todo3);

    given(todoRepository.findAll()).willReturn(allTodos);

    mvc.perform(get("/todos")) //
        .andExpect(status().isOk()) //
        .andExpect(jsonPath("$", hasSize(3))) //
        .andExpect(jsonPath("$[0].title", is(todo1.getTitle()))) //
        .andExpect(jsonPath("$[1].title", is(todo2.getTitle()))) //
        .andExpect(jsonPath("$[2].title", is(todo3.getTitle())));
  }

  @Test
  public void testGivenAJSONPayloadItShouldSaveATodo() throws Exception {
    Todo todo = Todo.builder().title("Grab your hat").build();

    given(todoRepository.save(any(Todo.class))).willReturn(todo);

    mvc.perform(post("/todos") //
        .contentType(MediaType.APPLICATION_JSON) //
        .content("{ \"title\": \"Grab your hat\" }".getBytes()) //
        .characterEncoding("utf-8")) //
        .andExpect(status().is(HttpStatus.CREATED.value())) //
        .andExpect(jsonPath("$.title", is("Grab your hat")));
  }
  
  @Test
  public void testDeleteAllTodos() throws Exception {
    mvc.perform(delete("/todos")).andExpect(status().isOk());
    
    verify(todoRepository, atLeast(1)).deleteAll();
  }
  
  @Test
  public void testGetATodo() throws Exception {
    Todo todo = Todo.builder().id(3936L).title("Drink a cup (of tea)").build();
    
    given(todoRepository.findById(todo.getId())).willReturn(Optional.of(todo));

    mvc.perform(get(String.format("/todos/%s", todo.getId()))) //
        .andExpect(status().isOk()) //
        .andExpect(jsonPath("$.title", is("Drink a cup (of tea)")));
  }
  
  @Test
  public void testCreateTodosContainAUrl() throws Exception {
    Todo todo = Todo.builder().id(8L).title("Find your coat").build();

    given(todoRepository.save(any(Todo.class))).willReturn(todo);

    mvc.perform(post("/todos") //
        .contentType(MediaType.APPLICATION_JSON) //
        .content("{ \"title\": \"Grab your hat\" }".getBytes()) //
        .characterEncoding("utf-8")) //
        .andExpect(status().is(HttpStatus.CREATED.value())) //
        .andExpect(jsonPath("$.url", is(String.format("http://localhost/todos/%s", todo.getId()))));
  }
}