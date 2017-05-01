import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RuleForm from './RuleForm';
import RuleViewForm from './RuleViewForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.addNewRule = this.addNewRule.bind(this);
  }
  
  state = {
    engineName: 'Quote Filter',

    rules: [
        { 
          id: 1, 
          name: 'Retail_Table',
          conditions: [ { id: 1, name: 'A == B' } ],
          actions: [ { id: 1, name: 'Show' } ],
        }
    ],
     
    availableActions: [
        { id: 1, name: 'Show' },
        { id: 2, name: 'Hide' }
    ],
    availableConditions: [
        { id: 1, name: 'A == B' },
        { id: 2, name: 'A > B' },
        { id: 3, name: 'A < B' }
    ],

    selectedActions: [],
    selectedConditions: []
  }

  addNewRule(rule) {
      if (!rule) return;

      this.setState(prevState => ({
        rules: prevState.rules.concat(rule) // prevState is needed for avoiding race conditions
      }));
  }


/*
  buildRule(){
    return {
      name: this.state.ruleName,
      actions: this.state.selectedActions,
      conditions: this.state.selectedConditions
    }; 
  }


  selectCondition(condition) {
    if (!condition) return;

    this.state.selectedConditions.push(condition);
    this.setState({ selectedConditions: this.state.selectedConditions});
  }
*/
  render() {
    return (      
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Rule Engine!</h2>
        </div>
        <p className="App-intro">
          Rule engine builder for {this.state.engineName}          
        </p>
        <hr/>      

        <RuleForm rule={this.state.rules[0]} onSubmit={this.addNewRule} />
        <br/><br/>

        <hr/>
        <b>.: Rules :.</b>
        <hr/>
        {this.state.rules.map(r => <RuleViewForm key={r.id} rule={r}/>)}

      </div>
    );
  }
}

export default App;

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