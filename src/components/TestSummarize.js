import React, { Component } from 'react';

class TestSummarize extends Component {
  renderCorrect(task) {
    return (
      <div style={{ margin: '1em' }}>
        <div>Text: {task}</div>
      </div>
    );
  }

  getTotalTasks(test) {
    return test
      .get('tasks')
      .size;
  }

  getTotalCorrectAnswers(test) {
    return test
      .get('tasks')
      .filter(task => task.get('isCorrect'))
      .size;
  }

  render() {
    const { test } = this.props;

    const totalTasks = this.getTotalTasks(test);
    const totalCorrect = this.getTotalCorrectAnswers(test);

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
      </div>
    );
  }
}

export default TestSummarize;
