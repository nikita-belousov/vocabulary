export function addWordToList(listId, word) {
  return {
    type: 'ADD_WORD_TO_LIST',
    listId,
    word
  }
}

export function removeWordFromList(listId, word) {
  return {
    type: 'REMOVE_WORD_FROM_LIST',
    listId,
    word
  }
}

export function createList(options) {
  return {
    type: 'CREATE_LIST',
    options
  }
}

export function updateWordInfo(listId, wordId, newInfo) {
  return {
    type: 'UPDATE_WORD_INFO',
    listId,
    wordId,
    newInfo
  }
}

export function createTest(neededLists, options) {
  return {
    type: 'CREATE_TEST',
    neededLists,
    options
  }
}

export function updateTaskInput(taskId, value) {
  return {
    type: 'UPDATE_TASK_INPUT',
    taskId,
    value
  }
}

export function summarize() {
  return {
    type: 'SUMMARIZE'
  }
}

export function resetTestState() {
  return {
    type: 'RESET_TEST_STATE'
  }
}

export function nextTask() {
  return {
    type: 'NEXT_TASK'
  }
}
