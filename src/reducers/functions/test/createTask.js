import { fromJS } from 'immutable'
import shortid from 'shortid'
import _ from 'underscore'

function getVariants(correct, allVariants, amount) {
  const all = allVariants.slice()
  const res = []

  const right = Array.isArray(correct)
    ? correct[_.random(correct.length - 1)]
    : correct
  res.push(right)
  all.splice(_.indexOf(all, right), 1)

  for (let i = 0; i < amount - 1; i++) {
    const randomIndex = _.random(all.length - 1)

    res.push(all[randomIndex])
    all.splice(randomIndex, 1)

    if (all.length === 0) return res
  }


  return _.shuffle(res)
}

function createTask(listId, word, options, allVariants) {
  const task = {}

  const { id, original, translations } = word

  task.id = shortid.generate()
  task.listId = listId
  task.wordId = id
  task.userAnswer = ''

  task.text = options.translateMode === 'fromOriginal'
    ? original
    : word.translations[0]

  task.correct = options.translateMode === 'fromOriginal'
    ? word.translations
    : word.original

  task.variants = allVariants
    ? getVariants(task.correct, allVariants, 4)
    : null

  return task
}

export default createTask
