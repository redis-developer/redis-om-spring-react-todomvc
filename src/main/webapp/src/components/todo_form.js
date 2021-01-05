import React, { useState, useContext } from 'react';
import { TodosContext } from "../context/todos_context";
import { KEY_RETURN, KEY_ESCAPE } from 'keycode-js';

const TodoForm = function () {
  const { createTodo } = useContext(TodosContext);
  const [title, setTitle] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onKeyDown = (e) => {
    if (e.which === KEY_RETURN) {
      createTodo(title);
      setTitle("");
    }

    if (e.which === KEY_ESCAPE) {
      setTitle("");
    }
  }

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus={true}
      onChange={changeTitle}
      onKeyDown={onKeyDown}
      value={title}
    />
  );
}

export default TodoForm;