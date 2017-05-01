import React, { Component } from 'react';

class RuleViewForm extends Component {
    conditionView(condition) {
        return (
            <div key={condition.id}>{condition.name}</div>
        );
    }

    actionView(action) {
        return (
            <div key={action.id}>{action.name}</div>
        );
    }

    render() {
      return (
          <div key={this.props.rule.id}>
              <div>name: {this.props.rule.name}</div>
              <div>conditions: {(this.props.rule.conditions || []).map(c => this.conditionView(c))}</div>
              <div>actions: {(this.props.rule.actions || []).map(a => this.actionView(a))}</div>
              <hr/>
          </div>                    
      );
    }
}

export default RuleViewForm;