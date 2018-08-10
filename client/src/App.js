import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';
import SignIn from './components/SignIn';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route path='/jokes' component={Jokes} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </div>
    );
  }
}

export default App;
