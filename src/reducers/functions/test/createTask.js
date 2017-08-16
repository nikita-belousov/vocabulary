import shortid from 'shortid'

function createTask(listId, word, options) {
  const task = {}

  const { id, original, translations } = word.toJS()

  task.id = shortid.generate()
  task.listId = listId
  task.wordId = id
  task.text = word.getIn(['translations', 0])
  task.correct = word.get('original')
  task.userAnswer = ''

  return task
}

export default createTask
