import React, { Component } from 'react';

class Rule extends Component {  
  /*constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }*/
  state = {
    name: 'rule',
    conditions: [],
    actions: []
  }

  render() {
    return (
      <div>{this.state.name}</div>
    );
  }
}

export default Rule;
