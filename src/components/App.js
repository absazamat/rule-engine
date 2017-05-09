import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RuleForm from './RuleForm';
import RuleViewForm from './RuleViewForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.saveRule = this.saveRule.bind(this);
  }
  
  state = {
    engineName: 'Quote Filter',

    rules: {
        retailTable: {
          id: 1, 
          name: 'retailTable',
          conditions: [ { id: 1, name: 'A == B' } ],
          actions: [ { id: 1, name: 'Show' } ],
        }
    },
     
    availableActions: [
        { id: 1, name: 'Show' },
        { id: 2, name: 'Hide' }
    ],
    availableConditions: [
        { id: 1, name: 'A == B' },
        { id: 2, name: 'A > B' },
        { id: 3, name: 'A < B' }
    ],
    
    ruleToSave: {
        id: 0,
        name: '',
        conditions: [ { id: 1, name: 'A == B' } ],
        actions: [ { id: 1, name: 'Show' } ],
    },

    selectedActions: [1, 2],
    selectedConditions: []
  }

  saveRule(rule) {
      if (!rule) return;

      if (rule.id === 0) {
        // сreate rule
        rule.id = Object.keys(this.state.rules).length + 1; // call backend api: save to db
      }

      // prevState is needed for avoiding race conditions
      this.setState(prevState => {        
        prevState.rules[rule.name] = rule;
        return prevState;
      });      
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

        <RuleForm rule={this.state.ruleToSave} 
                  availableActions={this.state.availableActions}
                  availableConditions={this.state.availableConditions}
                  onSubmit={this.saveRule} />
        <br/>

        <hr/>
        <b>.: Rules :.</b>
        <hr/>
        { Object.keys(this.state.rules).map(key => <RuleViewForm key={key} rule={this.state.rules[key]} />) }
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