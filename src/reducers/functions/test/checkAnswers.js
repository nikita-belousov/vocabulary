import * as utils from './../../../utils'

function isCorrect(task, options) {
  const correct = task.get('correct')
  const userAnswer = utils.getStringBase(
    task.get('userAnswer')
  )

  const translateMode = options.get('translateMode')
  const requiredTranslations = options.get('requiredTranslations')

  if (translateMode === 'toOriginal') {
    return userAnswer === correct
  } else if (translateMode === 'fromOriginal') {
    if (requiredTranslations === 'any') {
      return correct.includes(userAnswer)
    } else if (requiredTranslations === 'all') {
      return utils.areArraysEqual(
        userAnswer.split(','),
        correct.toJS()
      )
    }
  }
}

function checkAnswers(tasks, options) {
  return tasks.map(task =>
    task.set('isCorrect', isCorrect(task, options))
  )
}

export default checkAnswers;
