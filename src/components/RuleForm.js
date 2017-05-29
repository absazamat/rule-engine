import React, { Component } from 'react';

import ConditionForm from './ConditionForm';
import ActionForm from './ActionForm';

class RuleForm extends Component {    
    constructor(props) {
        super(props);

        this.handleRuleNameChange = this.handleRuleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.toggleEntity = this.toggleEntity.bind(this);
        this.toggleCondition = this.toggleCondition.bind(this);
        this.toggleAction = this.toggleAction.bind(this);

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
        this.toggleEntity(condition, 'conditions');
    }

    toggleAction(action) {
        this.toggleEntity(action, 'actions');
    }    

    toggleEntity(entity, type) {
        if (!entity) return;

        this.setState(prevState => ({  
            [type]: prevState[type].filter(c => c.id === entity.id).length > 0 ? 
                            prevState[type].filter(c => c.id !== entity.id) :
                            prevState[type].concat(entity)
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
                    <br/><br/>

                    <ConditionForm availableConditions={this.state.availableConditions}
                                   selectedConditions={this.state.conditions}
                                   toggleCondition={this.toggleCondition} />
                    <br/>

                    <ActionForm availableActions={this.state.availableActions}
                                selectedActions={this.state.actions}
                                toggleAction={this.toggleAction} />
                    <br/>

                    <input type="submit" value="Save" />                   
                </form>
            </div>                    
        );
    }
}

export default RuleForm;