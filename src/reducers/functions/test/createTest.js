import { fromJS, toJS } from 'immutable'
import shortid from 'shortid'
import * as utils from './../../../utils'

import {
  createTasks
} from './../testFunctions'

function createTest(state, neededLists, options) {
  let tasks = createTasks(state, neededLists, options)
  tasks = utils.shuffleArray(tasks)

  return state.set('test', fromJS({
    state: 'passing',
    showMode: options.showMode,
    currentTask: (options.showMode === 'all' ? null : 0),
    tasks
  }))
}

export default createTest
