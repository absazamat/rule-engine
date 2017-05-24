import React, { Component } from 'react';

import ConditionForm from './ConditionForm';

class RuleForm extends Component {    
    constructor(props) {
        super(props);

        this.handleRuleNameChange = this.handleRuleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.addCondition = this.addCondition.bind(this);
        this.removeCondition = this.removeCondition.bind(this);  
    }

    state = {
        ruleName: '',
        actions: [],
        conditions: [],

        availableActions: [
            { id: 1, name: 'Show' },
            { id: 2, name: 'Hide' }
        ],

        availableConditions: [
            { id: 1, name: 'A == B' },
            { id: 2, name: 'A > B' },
            { id: 3, name: 'A < B' }
        ]
    }

    handleRuleNameChange(event) {
        /*
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
        */

        this.setState({
            ruleName: event.target.value
        });       
    } 

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.ruleName) {                     
            this.props.onSubmit({
                id: 0,
                name: this.state.ruleName,
                actions: this.state.actions,
                conditions: this.state.conditions
            });

            this.setState({ 
                ruleName: '',
                actions: [],
                conditions: []
            });
        }
    }

    addCondition(condition) {
        // do not add dupes
        this.setState(prevState => ({        
            conditions: prevState.conditions.concat(condition)
        }));              
    }

    removeCondition(c) {
        alert(`removed: ${c}`);
    }

    render() {        
        return (          
            <div>
                <form onSubmit={this.handleSubmit} name="ruleForm">
                    <label htmlFor="ruleName">Name:</label>        
                    <input type="text" 
                           id="ruleName"
                           name="ruleName"
                           value={this.state.ruleName} 
                           onChange={this.handleRuleNameChange}
                           placeholder="rule name..." />
                    <br /><br/>

                    <ConditionForm availableConditions={this.state.availableConditions}
                                   selectedConditions={this.state.conditions}
                                   addCondition={this.addCondition}
                                   removeCondition={this.removeCondition} />
                    <br/>

                    <label htmlFor="actions">Actions:</label>
                    <br/>

                    <input type="submit" value="Save" />                   
                </form>
            </div>                    
        );
    }
}

export default RuleForm;