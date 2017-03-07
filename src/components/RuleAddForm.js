import React, { Component } from 'react';

class Rule {
    constructor(name) {
        this.name = name;
        this.conditions = [];
        this.actions = [];
    }

    addAction(action) {
        if (action) {
            this.actions.push(action);
        }
    }

    addCondition(condition) {
        if (condition) {
            this.conditions.push(condition);
        }
    }

}

class Condition {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Action {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class RuleListForm extends Component {
    state = {

    }    
}

class RuleAddForm extends Component {
    /*constructor(props) {
      super(props);
      // Operations usually carried out in componentWillMount go here
    }*/

    state = {
        name: 'Rule',
        conditions: [ 
                new Condition(1, 'A == B'),
                new Condition(2, 'A > B'),
                new Condition(3, 'A < B')
            ],
        actions: [ 
                new Action(1, 'Show'),
                new Action(2, 'Hide')
            ]
    }
    
    conditionList() {
        return this.state.conditions.map(
            c => <option value={c.id}>{c.name}</option>
        );
    }

    actionList() {
        return this.state.actions.map(
            a => <option value={a.id}>{a.name}</option>
        );
    }

    render() {
        return (
            <div>
                <select name="conditions">
                    { this.conditionList() }
                </select>

                <select name="actions">
                    { this.actionList() }
                </select>
            </div>
        );
    }

}

export default RuleAddForm;