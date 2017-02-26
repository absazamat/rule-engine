import React, { Component } from 'react';

class Condition extends Component {
    /*constructor(props) {
      super(props);
      // Operations usually carried out in componentWillMount go here
    }*/
    state = {
        name: 'Condition name',
        description: ''
    }

    render() {
        return (
            <div>{this.state.name}</div>
        );
  }
}

export default Condition;