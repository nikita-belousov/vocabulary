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

  onNextTask = () => {
    this.props.dispatch(actions.nextTask())
  }

  onTestFinish = () => {
    this.props.dispatch(actions.summarize())
  }

  renderOneTask(tasks, id) {
    const currentTask = tasks.get(id)
    const isLast = id === tasks.size - 1

    return (
      <div>
        <Task
          id={id}
          text={currentTask.get('text')}
          inputValue={currentTask.get('userAnswer')}
          variants={currentTask.get('variants')}
          onInputChange={this.handleInputChange}
        />

         <Button
           onClick={isLast ? this.onTestFinish : this.onNextTask}
         >
           {isLast ? 'Finish' : 'Next'}
         </Button>
      </div>
    )
  }

  renderAllTasks(tasks) {
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
              variants={task.get('variants')}
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

  render() {
    const { test } = this.props
    const tasks = test.get('tasks')
    const currentTask = test.get('currentTask')

    return test.getIn(['options', 'showMode']) === 'all'
      ? this.renderAllTasks(tasks)
      : this.renderOneTask(tasks, currentTask)
  }
}

Test = connect()(Test)

export default Test
