function removeWordFromList(state, listId, wordId) {
  return state.map(list => {
    if (list.get('id') === listId) {
      return list.updateIn(
        ['words'],
        words => words.filter(word =>
          word.get('id') !== wordId
        )
      )
    } else return list
  })
}

export default removeWordFromList
