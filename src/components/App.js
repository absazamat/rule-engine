import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RuleViewForm from './RuleViewForm';
import RuleAddForm from './RuleAddForm';
/*
class Rule {
    constructor(name, conditions) {
        this.name = name;
        this.conditions = conditions;
        this.actions = [];
    }
}

class Condition {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Action {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
*/

class App extends Component {
  constructor(props) {
    super(props);

    this.addRule = this.addRule.bind(this); 
  }
  
  state = {
    name: 'Quote Filter',
    rules: []
  }

  addRule(rule) {
      if (!rule) return;

      this.state.rules.push(rule);
      this.setState({ rules: this.state.rules});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Rule Engine!</h2>
        </div>
        <p className="App-intro">
          Rule engine builder for {this.state.name}          
        </p>
        <hr/>

        <RuleAddForm addRule={this.addRule} />
        <br/><br/> 

        <hr/>
        <b>.: Rules :.</b>
        <hr/>
        { this.state.rules.map(r => <RuleViewForm rule={r}/>) }

      </div>
    );
  }
}

export default App;