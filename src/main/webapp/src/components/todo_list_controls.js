import React, { useMemo, useContext } from 'react';
import { TodosContext } from "../context/todos_context";
import { NavLink } from "react-router-dom";

const TodoListControls = function (props) {
  const { todos, clearCompleted } = useContext(TodosContext);

  const itemsLeft = useMemo(() => todos.reduce((p, c) => p + (c.completed ? 0 : 1), 0), [
    todos
  ]);

  const itemsCompleted = useMemo(() => todos.length - itemsLeft, [
    todos, itemsLeft
  ]);

  return (
    <>{todos.length > 0 && <footer className="footer">
      {/*  This should be `0 items left` by default  */}
      <span className="todo-count"><strong>{itemsLeft}</strong> {itemsLeft != 1 ? "items" : "item"} left</span>
      {/*  Remove this if you don't implement routing  */}
      <ul className="filters">
        <li>
          <NavLink to="/" exact={true} activeClassName="selected">All</NavLink>
        </li>
        <li>
          <NavLink to="/active" activeClassName="selected">Active</NavLink>
        </li>
        <li>
          <NavLink to="/completed" activeClassName="selected">Completed</NavLink>
        </li>
      </ul>
      {/*  Hidden if no completed items are left ↓  */}
      {itemsCompleted > 0 &&
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
      }
    </footer>}</>
  );
}

export default TodoListControls;