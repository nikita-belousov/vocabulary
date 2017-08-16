import * as utils from './../../../utils'

function checkAnswers(tasks) {
  return tasks.map(task => {
    const userAnswer = task.get('userAnswer')
    const correct = task.get('correct')

    return task.set(
      'isCorrect',
      utils.getStringBase(userAnswer) === correct
    )
  })
}

export default checkAnswers;
