import React from 'react';
import ReactDOM from 'react-dom';

import TodoForm from './components/todo_form';
import TodoList from './components/todo_list';
import Footer from './components/footer';

import { TodosContextProvider } from "./context/todos_context";
import { HashRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <TodosContextProvider>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoForm />
      </header>
      <Router>
        <Route path="/:filter?" component={TodoList} />
      </Router>
    </section>
    <Footer />
  </TodosContextProvider>,
  document.getElementById('react')
);