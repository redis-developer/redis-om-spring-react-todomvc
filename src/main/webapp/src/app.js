import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './components/footer';

ReactDOM.render(
  <React.Fragment>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
    </section>
    <Footer />
  </React.Fragment>,
  document.getElementById('react')
);