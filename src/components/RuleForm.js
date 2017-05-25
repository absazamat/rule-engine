import React, { Component } from 'react';

import ConditionForm from './ConditionForm';

class RuleForm extends Component {    
    constructor(props) {
        super(props);

        this.handleRuleNameChange = this.handleRuleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.toggleCondition = this.toggleCondition.bind(this);

        if (props.ruleToSave) {
            this.state = {
                ruleName: props.ruleToSave.name,
                conditions: props.ruleToSave.conditions,
                actions: props.ruleToSave.actions,
                
                availableConditions: [
                    { id: 1, name: 'A == B' },
                    { id: 2, name: 'A > B' },
                    { id: 3, name: 'A < B' }
                ],
                availableActions: [
                    { id: 1, name: 'Show' },
                    { id: 2, name: 'Hide' }
                ]
            };
        }
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
                id: this.props.ruleToSave.id,
                name: this.state.ruleName,
                actions: this.state.actions,
                conditions: this.state.conditions
            });

            // reset view
            this.setState({ 
                ruleName: '',
                actions: [],
                conditions: []
            });
        }
    }

    toggleCondition(condition) {
        if (!condition) return;

        this.setState(prevState => ({  
            conditions: prevState.conditions.filter(c => c.id === condition.id).length > 0 ? 
                            prevState.conditions.filter(c => c.id !== condition.id) :
                            prevState.conditions.concat(condition)
        }));         
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
                                   toggleCondition={this.toggleCondition} />
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