import React, { Component } from 'react';

class ConditionForm extends Component {
    state = {
    }

    conditionView(condition) {        
        return (
            <div key={condition.id} 
                 className={this.conditionClassName(condition)}
                 onClick={() => this.props.addCondition(condition)}>
                    {condition.name}
            </div>
        );
    }

    conditionClassName(condition) {
        if (this.props.selectedConditions.map(c => c.id).indexOf(condition.id) >= 0) {
            return 'selected';
        }
    }

    render() {
        return (
            <div>
                <label htmlFor="conditions">Conditions:</label>
                <div id="conditions">
                    {(this.props.availableConditions || []).map(c => this.conditionView(c))}
                </div>
            </div>
        );
    }
}

export default ConditionForm;
