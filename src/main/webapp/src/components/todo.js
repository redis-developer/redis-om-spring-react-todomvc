import React, { useState, useEffect, useRef, useContext } from 'react';
import { TodosContext } from "../context/todos_context";

const Todo = function (props) {
  const { getTodo }  = useContext(TodosContext);
  const [todo, setTodo] = useState(getTodo(props.id));

  return (
    <li>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={todo.completed} />
        <label>{todo.title}</label>
        <button
          className="destroy"
        ></button>
      </div>
      <input
        className="edit"
        defaultValue={todo.title} />
    </li>
  );
}

export default Todo;