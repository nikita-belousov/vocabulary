import { fromJS } from 'immutable'
import shortid from 'shortid'

function addWordToList(state, listId, word) {
  const newWord = {
    ...word.toJS(),
    id: shortid.generate(),
    learningState: 'notLearnt'
  }

  return state.map(list => {
    if (list.get('id') === listId) {
      return list.updateIn(
        ['words'],
        words => words.push(fromJS(newWord))
      )
    } else return list
  })
}

export default addWordToList
