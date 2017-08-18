import { fromJS, toJS } from 'immutable'
import shortid from 'shortid'
import _ from 'underscore'

import {
  createTasks
} from './../testFunctions'

function createTest(state, neededLists, options) {
  let tasks = createTasks(state, neededLists, options)
  tasks = _.shuffle(tasks)

  return state.set('test', fromJS({
    state: 'passing',
    options: { ...options },
    currentTask: (options.showMode === 'all' ? null : 0),
    tasks
  }))
}

export default createTest
