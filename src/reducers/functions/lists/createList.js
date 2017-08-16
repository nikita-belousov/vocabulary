import { fromJS } from 'immutable'
import shortid from 'shortid'

function createList(state, options) {
  const { name, description, lang } = options

  const newList = {
    id: shortid.generate(),
    name,
    description: description || '',
    lang: lang || '',
    words: []
  }

  return state.update(lists =>
    lists.push(fromJS(newList))
  )
}

export default createList
