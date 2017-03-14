import React, { Component } from 'react';

import RuleViewForm from './RuleViewForm';
import ConditionAddForm from './ConditionAddForm';
import ActionAddForm from './ActionAddForm';

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
        actions: [],
        isAdded: false      
    }

    addCondition(condition) {
        if (!condition || !condition.id) return;

        this.state.conditions.push(condition);
        this.setState({ conditions: this.state.conditions});
    }

    addAction(action) {
        if (!action || !action.id) return;

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
        //this.ruleForm.reset();

        this.setState({
            name: null,
            conditions: [],
            actions: []    
        });
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
                <ConditionAddForm addCondition={this.addCondition} />
                <ActionAddForm addAction={this.addAction} />

                <hr/>    
                <b>New rule</b>
                <RuleViewForm rule={this.state} />                
            </div>
        );
    }
}

export default RuleAddForm;