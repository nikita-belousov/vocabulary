import { fromJS } from 'immutable'
import shortid from 'shortid'

function createList(state, options) {
  const { name, description, langFrom, langTo } = options

  const newList = {
    id: shortid.generate(),
    name,
    description: description || null,
    langFrom: langFrom || null,
    langTo: langTo || null,
    words: []
  }

  return state.update(lists =>
    lists.push(fromJS(newList))
  )
}

export default createList
