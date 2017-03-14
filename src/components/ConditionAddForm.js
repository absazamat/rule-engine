import React, { Component } from 'react';

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
        var conditions = this.state.conditions.map(
            c => <option value={c.id}>{c.name}</option>
        );
        conditions.unshift(<option>select...</option>);

        return conditions;
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

      this.setState({ conditions: this.state.conditions.filter(c => c.id != this.state.id) });       
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

export default ConditionAddForm;
