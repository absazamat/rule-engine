import React, { Component } from 'react';

class ActionForm extends Component {
    actionView(action) {        
        return (
            <div key={action.id} 
                 className={this.actionClassName(action)}
                 onClick={() => this.props.toggleAction(action)}>
                    {action.name}
            </div>
        );
    }

    actionClassName(action) {
        if ((this.props.selectedActions || []).map(c => c.id).indexOf(action.id) >= 0) {
            return 'selected';
        }
    }

    render() {
        return (
            <div>
                <label htmlFor="actions">Actions:</label>
                <div id="actions">
                    {(this.props.availableActions || []).map(c => this.actionView(c))}
                </div>
            </div>
        );
    }
}

export default ActionForm;
