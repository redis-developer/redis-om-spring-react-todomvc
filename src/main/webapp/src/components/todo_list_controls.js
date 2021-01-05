import React, { useMemo, useContext } from 'react';
import { TodosContext } from "../context/todos_context";

const TodoListControls = function (props) {
  const { todos, clearCompleted } = useContext(TodosContext);

  const itemsLeft = useMemo(() => todos.reduce((p, c) => p + (c.completed ? 0 : 1), 0), [
    todos
  ]);

  const itemsCompleted = useMemo(() => todos.length - itemsLeft, [
    todos, itemsLeft
  ]);

  return (
    <footer className="footer">
      {/*  This should be `0 items left` by default  */}
      <span className="todo-count"><strong>{itemsLeft}</strong> {itemsLeft != 1 ? "items" : "item"} left</span>
      {/*  Remove this if you don't implement routing  */}
      <ul className="filters">
        <li>
				  <a className="selected" href="#/">All</a>
			  </li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
      </ul>
      {/*  Hidden if no completed items are left ↓  */}
      {itemsCompleted > 0 &&
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
      }
    </footer>
  );
}

export default TodoListControls;