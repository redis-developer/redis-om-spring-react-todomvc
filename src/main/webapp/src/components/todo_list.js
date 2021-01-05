import React, { useContext } from 'react';
import { TodosContext } from "../context/todos_context";

const TodoList = function () {
  const { todos } = useContext(TodosContext);

  return (
    <section className="main" >
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => (
				<li key={todo.id}>
          <div className="view">
            <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => {}}/>
            <label>{todo.title}</label>
            <button className="destroy"></button>
          </div>
          <input className="edit" defaultValue="{todo.title}" />
        </li>
        ))}
      </ul>
    </section >
  );
}

export default TodoList;