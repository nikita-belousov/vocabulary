import * as utils from './../../utils';

function checkAnswers(tasks) {
  return tasks.map(task => {
    const userAnswer = task.get('userAnswer');
    const correct = task.get('correct');

    return task.set(
      'isCorrect',
      utils.getStringBase(userAnswer) === correct
    )
  });
}

function summarize(state) {
  const tasks = state.getIn(['test', 'tasks']);
  const checked = checkAnswers(tasks);

  return state
    .setIn(
      ['test', 'state'],
      'summarizing'
    )
    .setIn(
      ['test', 'tasks'],
      checked
    );
}

export default summarize;
