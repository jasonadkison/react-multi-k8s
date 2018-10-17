import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import About from './About';
import Fib from './Fib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Fib Calculator v2</h1>
            <ul>
              <li><Link className="App-link" to="/">Home</Link></li>
              <li><Link className="App-link" to="/about">About</Link></li>
            </ul>
          </header>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
