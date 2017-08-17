import * as utils from './../../../utils'

import {
  updateWordInfo
} from './../listsFunctions'

import {
  checkAnswers
} from './../testFunctions'

function setLearnt(state, correctWords) {
  correctWords.forEach(correctWord =>
    state = updateWordInfo(
      state,
      correctWord.listId,
      correctWord.id,
      { isLearnt: true }
    )
  )

  return state;
}

function summarize(state) {
  const tasks = state.getIn(['test', 'tasks'])
  const options = state.getIn(['test', 'options'])

  const checked = checkAnswers(tasks, options)

  const correctWords = checked.reduce((res, task) => {
      if (task.get('isCorrect')) {
        res.push({
          listId: task.get('listId'),
          id: task.get('wordId')
        })
      }

      return res
  }, [])

  return state
    .update(
      'lists',
      lists => setLearnt(lists, correctWords)
    )
    .setIn(
      ['test', 'state'],
      'summarizing'
    )
    .setIn(
      ['test', 'tasks'],
      checked
    )
}

export default summarize
