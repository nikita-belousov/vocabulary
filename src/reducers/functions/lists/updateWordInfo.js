function updateWordInfo(state, listId, wordId, newInfo) {
  return state.map(list => {
    if (list.get('id') === listId) {
      return list.updateIn(
        ['words'],
        words => words.map(word => {
          if (word.get('id') === wordId) {
            return word.merge(newInfo)
          } else return word
        })
      )
    } else return list
  })
}

export default updateWordInfo
