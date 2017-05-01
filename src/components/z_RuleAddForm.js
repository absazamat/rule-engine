import React, { Component } from 'react';

class RuleAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);  
    }

    state = {
        name: null
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

          this.props.addRule({
              name: this.state.name
          });

          this.refs.name.value = null;
          this.setState({ name: null });
      }
    }

    render() {
        return (
            <div>       
                <div><b>Add rule</b></div>
                <form onSubmit={this.handleSubmit} name="ruleForm">
                    <label>
                        Name: <input type="text" ref="name" name="name" value={this.state.name} onChange={this.handleChange} placeholder="rule name..." />
                    </label>              
                    <input type="submit" value="Add rule" />                   
                </form>
                

                <div>{this.state.name}</div>          
            </div>
        );
    }
}

export default RuleAddForm;