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
                actions: [ { id: 1, name: 'Show' } ]
            }
        },

        ruleToSave: { 
            id: 1,
            name: 'retailTable',
            conditions: [ { id: 1, name: 'A == B' } ],
            actions: [ { id: 1, name: 'Show' } ]                        
        }
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
            //prevState.rules[prevState.ruleToSave.name] = null;     

            return prevState;
        });      
    }

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

                <RuleForm ruleToSave={this.state.ruleToSave}
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