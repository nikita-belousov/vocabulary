import { fromJS } from 'immutable'
import shortid from 'shortid'
import * as utils from './../../../utils'

function getVariants(allVariants, amount) {
  const all = allVariants.slice()
  const res = []

  for (let i = 0; i < amount; i++) {
    const randomIndex = utils.getRandomArbitrary(0, all.length - 1)

    res.push(all[randomIndex])
    all.splice(randomIndex, 1)

    if (all.length === 0) return res
  }

  return res
}

function createTask(listId, word, options, allVariants) {
  const task = {}

  const { id, original, translations } = word

  task.id = shortid.generate()
  task.listId = listId
  task.wordId = id
  task.userAnswer = ''
  task.variants = allVariants ? getVariants(allVariants, 4) : null

  task.text = options.translateMode === 'fromOriginal'
    ? original
    : word.translations[0]

  task.correct = options.translateMode === 'fromOriginal'
    ? word.translations
    : word.original

  return task
}

export default createTask
