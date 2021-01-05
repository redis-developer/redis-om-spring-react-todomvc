import React, { useState, useEffect, useRef, useContext } from 'react';
import { TodosContext } from "../context/todos_context";

const Todo = function (props) {
  const { getTodo, updateTodo, deleteTodo }  = useContext(TodosContext);
  const [todo, setTodo] = useState(getTodo(props.id));
  const [editing, setEditing] = useState(false);

  const toggleTodo = () => {
    todo.completed = !todo.completed;
    updateTodo(todo);
  }

  const removeTodo = () => {
    deleteTodo(props.id);
  }

  return (
    <li
      onDoubleClick={() => setEditing(val => !val)}
      className={`${editing ? "editing" : ""}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={toggleTodo} />
        <label>{todo.title}</label>
        <button
          className="destroy"
          onClick={removeTodo}
        ></button>
      </div>
      <input
        className="edit"
        defaultValue={todo.title} />
    </li>
  );
}

export default Todo;