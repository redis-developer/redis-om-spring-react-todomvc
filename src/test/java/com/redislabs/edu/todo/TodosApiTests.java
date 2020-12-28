package com.redislabs.edu.todo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

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

}
