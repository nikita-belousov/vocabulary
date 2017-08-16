import {
  createTask
} from './../testFunctions'

function createTasks(state, lists, options) {
  return lists.reduce((res, listId) => {
    state
      .get('lists')
      .find(list => list.get('id') === listId)
      .get('words')
      .forEach(word => {
        const task = createTask(listId, word, options)
        res.push(task)
      })

    return res
  }, [])
}

export default createTasks
