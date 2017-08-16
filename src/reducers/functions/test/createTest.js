import { fromJS, toJS } from 'immutable'
import shortid from 'shortid'
import * as utils from './../../../utils'

import {
  createTasks
} from './../testFunctions'

function createTest(state, neededLists, options) {
  let tasks = createTasks(state, neededLists, options)
  tasks = utils.shuffleArray(tasks)

  return state
    .setIn(
      ['test', 'state'],
      'passing'
    )
    .setIn(
      ['test', 'showMode'],
      options.get('showMode')
    )
    .setIn(
      ['test', 'tasks'],
      fromJS(tasks)
    )
}

export default createTest
