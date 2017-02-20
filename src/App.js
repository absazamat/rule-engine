import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Rule from './Rule';
import Condition from './Condition';

class App extends Component {
 /* constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }*/

  state = {
    name: 'QuoteFilter',
    rules: []
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Rule Engine!</h2>
        </div>
        <p className="App-intro">
          rule engine documentation for {this.state.name}          
        </p>   

        <Rule />
        <Condition />
      </div>
    );
  }
}

export default App;
