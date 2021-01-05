import React, { useReducer, useEffect, createContext } from "react";
import TodosAPI from '../services/todos_api';

export const TodosContext = createContext();

const initialState = {
  todos: [],
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload
      };
    case "UPDATE_TODO":
      const updated = action.payload;

      return {
        todos: state.todos.map(todo => todo.id === updated.id ? updated : todo)
      };
    case "CREATE_TODO":
      return {
        todos: [...state.todos, action.payload]
      };
    case "CLEAR_COMPLETED":
      return {
        todos: state.todos.filter(todo => !todo.completed)
      };
    case "TOGGLE_ALL":
      return {
        todos: [...state.todos, ...action.payload]
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      throw new Error();
  }
};

export const TodosContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createTodo = (title) => {
    TodosAPI.create(title).then(json => {
      dispatch({
        type: "CREATE_TODO",
        payload: json
      });
    })
  }

  const updateTodo = (todo) => {
    TodosAPI.updateTodo(todo).then(json => {
      dispatch({
        type: "UPDATE_TODO",
        payload: json
      });
    })
  }

  const clearCompleted = () => {
    state.todos //
      .filter(todo => todo.completed) //
      .forEach(todo => TodosAPI.delete(todo.id));

    dispatch({
      type: "CLEAR_COMPLETED"
    });
  }

  const toggleAll = () => {
    let allCompleted = state.todos.every(todo => todo.completed);
    let todos = allCompleted ? state.todos : state.todos.filter(todo => !todo.completed);
    let modified = []

    todos.forEach(todo => {
      todo.completed = !allCompleted;
      TodosAPI.updateTodo(todo).then(json => modified.push(json));
    });

    dispatch({
      type: "TOGGLE_ALL",
      payload: modified
    });
  }

  const getTodo = (id) => {
    return state.todos.find(todo => todo.id === id);
  }

  const deleteTodo = (id) => {
    TodosAPI.delete(id).then(status => {
      if (status == 200) {
        dispatch({
          type: "DELETE_TODO",
          payload: id
        });
      }
    });
  }

  useEffect(async () => {
    TodosAPI.getAll()
      .then(json => {
        dispatch({
          type: "SET_TODOS",
          payload: json
        });
      })
  }, []);

  return (
    <TodosContext.Provider value={{
      todos: state.todos,
      createTodo,
      updateTodo,
      clearCompleted,
      toggleAll,
      getTodo,
      deleteTodo
    }}>
      {props.children}
    </TodosContext.Provider>
  )
}
