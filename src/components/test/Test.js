import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

import {
  Button
} from './../commonComponents'

import {
  Task
} from './../testComponents'

let Test = class extends Component {
  handleInputChange = (e, taskId) => {
    this.props.dispatch(
      actions.updateTaskInput(
        taskId,
        e.target.value
      )
    )
  }

  onTestFinish = () => {
    this.props.dispatch(
      actions.summarize()
    )
  }

  render() {
    const tasks = this.props.test.get('tasks')

    return (
      <div>
        {tasks.map(task => {
          const index = tasks.indexOf(task)

          return (
            <Task
              key={index}
              id={index}
              text={task.get('text')}
              inputValue={task.get('userAnswer')}
              onInputChange={this.handleInputChange}
            />
          )
        })}

        <Button onClick={this.onTestFinish}>
          Finish test
        </Button>
      </div>
    )
  }
}

Test = connect()(Test)

export default Test
