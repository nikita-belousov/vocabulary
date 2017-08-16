import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

import {
  Button
} from './../commonComponents';

let TestSummarize = class extends Component {
  getTotalTasks(test) {
    return test
      .get('tasks')
      .size
  }

  getTotalCorrectAnswers(test) {
    return test
      .get('tasks')
      .filter(task => task.get('isCorrect'))
      .size
  }

  resetTestState = () => {
    this.props.dispatch(
      actions.resetTestState()
    );
  }

  renderCorrect = (task) => (
    <div style={{ margin: '1em' }}>
      <div>Text: {task}</div>
    </div>
  )

  render() {
    const { test } = this.props

    const totalTasks = this.getTotalTasks(test)
    const totalCorrect = this.getTotalCorrectAnswers(test)

    return (
      <div>
        {test.get('tasks').map(task =>
          <div
            key={task.get('id')}
            style={{ margin: '1em' }}
          >
            <p>
              Text:
              {' '}
              {task.get('text')}
            </p>
            <p>
              Your answer:
              {' '}
              <span style={{ color: task.get('isCorrect') ? 'green' : 'red' }}>
                {task.get('userAnswer')}
              </span>
            </p>
          </div>
        )}

        <p>
          Total: {totalCorrect}/{totalTasks}
        </p>

        <Button onClick={this.resetTestState}>
          New test
        </Button>
      </div>
    )
  }
}

TestSummarize = connect()(TestSummarize);

export default TestSummarize
