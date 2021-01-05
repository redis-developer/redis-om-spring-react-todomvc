import React, { useContext, useMemo } from 'react';
import { TodosContext } from "../context/todos_context";
import Todo from './todo';
import TodoListControls from './todo_list_controls';

const TodoList = function () {
  const { todos, toggleAll } = useContext(TodosContext);
  const allCompleted = useMemo(() => todos.every(todo => todo.completed), [todos]);

  return (
    <section className="main" >
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allCompleted}
        onChange={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => (
				<Todo key={todo.id} id={todo.id} />
        ))}
      </ul>
      <TodoListControls />
    </section >
  );
}

export default TodoList;