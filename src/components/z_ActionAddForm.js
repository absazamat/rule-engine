import React, { Component } from 'react';

class ActionAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);  
    }

    state = {
        id: null,
        availableActions: [ 
            { id: 1, name: 'Show' },
            { id: 2, name: 'Hide' }
        ],
        actions: [
            { id: 1, name: 'Show' },
            { id: 2, name: 'Hide' }
        ]
    }    

    actionOptionList() {
//        if (this.props.isAdded) {
//            this.setState({ availableActions: this.state.actions.slice(0) });
//        }

        var actions = this.state.availableActions.map(
            a => <option value={a.id}>{a.name}</option>
        );
        actions.unshift(<option>select...</option>);

        return actions;
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({ [name]: value });
    }

    handleSubmit(event) {
      event.preventDefault();  
      
      var action = this.state.availableActions.find(a => a.id == this.state.id);
      this.props.addAction(action);

      this.setState({ availableActions: this.state.availableActions.filter(a => a.id != this.state.id) });      
    }    

    render() {
         return (
         <form onSubmit={this.handleSubmit} name="actionForm">
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

export default ActionAddForm;