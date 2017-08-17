import { fromJS } from 'immutable'
import shortid from 'shortid'

function createTask(listId, word, options) {
  const task = {}

  const { id, original, translations } = word

  task.id = shortid.generate()
  task.listId = listId
  task.wordId = id
  task.text = word.translations[0]
  task.correct = word.original
  task.userAnswer = ''

  return task
}

export default createTask
