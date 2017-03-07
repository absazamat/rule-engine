import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

class RuleViewForm extends Component {
    conditionView(condition) {
        return (
            <div>{condition.name}</div>
        );
    }

    actionView(action) {
        return (
            <div>{action.name}</div>
        );
    }

    render() {
      return (
        <div>
            <div>name: {this.props.rule.name}</div>
            <div>conditions: {(this.props.rule.conditions || []).map(c => this.conditionView(c))}</div>
            <div>actions: {(this.props.rule.actions || []).map(a => this.actionView(a))}</div>
            <hr/>
        </div>
      );
    }

}

class ConditionAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);  
    }

    state = {
        id: null,
        conditions: [ 
                { id: 1, name: 'A == B' },
                { id: 2, name: 'A > B' },
                { id: 3, name: 'A < B' }
        ]
    }    

    conditionOptionList() {
        return this.state.conditions.map(
            c => <option value={c.id}>{c.name}</option>
        );
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({ [name]: value });
    }

    handleSubmit(event) {
      event.preventDefault();  
      
      var condition = this.state.conditions.find(c => c.id == this.state.id);
      this.props.addCondition(condition);          
    }    

    render() {
         return (
         <form onSubmit={this.handleSubmit}>
            <label>
                Condition:
                <select name="id" value={this.state.id} onChange={this.handleChange} >
                    { this.conditionOptionList() }
                </select>
            </label>
            <input type="submit" value="Add condition" />
         </form>
         );
    }
}

class ActionAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);  
    }

    state = {
        id: null,
        actions: [ 
                { id: 1, name: 'Show' },
                { id: 2, name: 'Hide' }
        ]
    }    

    actionOptionList() {
        return this.state.actions.map(
            a => <option value={a.id}>{a.name}</option>
        );
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({ [name]: value });
    }

    handleSubmit(event) {
      event.preventDefault();  
      
      var action = this.state.actions.find(c => c.id == this.state.id);
      this.props.addAction(action);          
    }    

    render() {
         return (
         <form onSubmit={this.handleSubmit}>
            <label>
                Action:
                <select name="id" value={this.state.id} onChange={this.handleChange} >
                    { this.actionOptionList() }
                </select>
            </label>
            <input type="submit" value="Add action" />
         </form>
         );
    }
}

class RuleAddForm extends Component {
    constructor(props) {
      super(props);

      this.addCondition = this.addCondition.bind(this);     
      this.addAction = this.addAction.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);  
    }

    state = {
        name: null,
        conditions: [],
        actions: []       
    }

    addCondition(condition) {
        if (!condition) return;

        this.state.conditions.push(condition);
        this.setState({ conditions: this.state.conditions});
    }

    addAction(action) {
        if (!action) return;

        this.state.actions.push(action);
        this.setState({ actions: this.state.actions });
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({ [name]: value });
    }

    handleSubmit(event) {
      event.preventDefault();

      if (this.state.name) {
        this.props.addRule(this.state);    
        this.ruleForm.reset();
      }
    }

    render() {
        return (
            <div>       
                <div><b>Add rule</b></div>
                <form onSubmit={this.handleSubmit} name="ruleForm">
                    <label>
                        Name: <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                    </label>              
                    <input type="submit" value="Add rule" />
                </form>
                <ConditionAddForm addCondition={this.addCondition}/>
                <ActionAddForm addAction={this.addAction}/>

                <hr/>    
                <b>New rule</b>
                <RuleViewForm rule={this.state} />                
            </div>
        );
    }
}



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
          Rule engine documentation for {this.state.name}          
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