import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import Task from './Task';

let Test = class extends Component {
  handleInputChange = (e, taskId) => {
    this.props.dispatch(
      actions.updateTaskInput(
        taskId,
        e.target.value
      )
    );
  }

  onTestFinish = () => {
    this.props.dispatch(
      actions.summarize()
    );
  }

  render() {
    const tasks = this.props.test.get('tasks');

    return (
      <div>
        {tasks.map(task => {
          const index = tasks.indexOf(task);

          return (
            <Task
              key={index}
              id={index}
              text={task.get('text')}
              inputValue={task.get('userAnswer')}
              onInputChange={this.handleInputChange}
            />
          );
        })}

        <button onClick={this.onTestFinish}>
          Finish test
        </button>
      </div>
    );
  }
}

Test = connect()(Test);

export default Test;
