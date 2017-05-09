import React, { Component } from 'react';

class RuleForm extends Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);  
    }

    state = {
        ruleName: ''
    }

    handleChange(event) {
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
                name: this.state.ruleName
            });
            this.setState({ ruleName: '' });
        }
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
                         onChange={this.handleChange}
                         placeholder="rule name..." />
                  <br />

                  <label htmlFor="conditions">Conditions:</label>
                  <div id="conditions">
                      
                  </div>
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