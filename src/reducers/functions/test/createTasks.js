import { List } from 'immutable'

import {
  createTask
} from './../testFunctions'

function getAllFromLists(state, lists, values) {
  return state
    .get('lists')
    .filter(list => lists.includes(list.get('id')))
    .reduce((res, list) => {
      list.get('words').forEach(word => {
        if (values === 'translations') {
          res = res.concat(word.get('translations'))
        } else if (values === 'originals') {
          res = res.push(word.get('original'))
        }
      })

      return res
    }, List())
}

function createTasks(state, lists, options) {
  let allVariants
  if (options.variants) {
    const needed = options.translateMode === 'toOriginal'
      ? 'originals'
      : 'translations'
    allVariants = getAllFromLists(state, lists, needed).toJS()
  }

  return lists.reduce((res, listId) => {
    state
      .get('lists')
      .find(list => list.get('id') === listId)
      .get('words')
      .forEach(word => {
        const task = createTask(
          listId,
          word.toJS(),
          options,
          allVariants
        )

        res.push(task)
      })

    return res
  }, [])
}

export default createTasks
