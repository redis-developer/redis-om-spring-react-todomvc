import React, { useState, useEffect, useRef, useContext } from 'react';
import { TodosContext } from "../context/todos_context";
import { KEY_RETURN, KEY_ESCAPE } from 'keycode-js';
import useOnClickOutside from "../hooks/use_on_click_outside";

const Todo = function (props) {
  const { getTodo, updateTodo, deleteTodo }  = useContext(TodosContext);
  const [todo, setTodo] = useState(getTodo(props.id));
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [titleBeforeEditing, setTitleBeforeEditing] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (editing) {
      setTitleBeforeEditing(title);
    }
  }, [editing]);

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (editing) setEditing(false);
  });

  const toggleTodo = () => {
    todo.completed = !todo.completed;
    updateTodo(todo);
  }

  const removeTodo = () => {
    deleteTodo(props.id);
  }

  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (editing && e.which === KEY_RETURN) {
      todo.title = title;
      updateTodo(todo);
      setEditing(false);
    }

    if (editing && e.which === KEY_ESCAPE) {
      setTitle(titleBeforeEditing);
      setEditing(false);
    }
  }

  return (
    <li
      onDoubleClick={() => setEditing(val => !val)}
      className={`${editing ? "editing" : ""}`}
      ref={wrapperRef}
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
        onChange={changeTitle}
        onKeyDown={handleKeyDown}
        value={title} />
    </li>
  );
}

export default Todo;