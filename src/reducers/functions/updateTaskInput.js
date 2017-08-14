function updateTaskInput(
  state,
  taskId,
  value
) {
  return state.setIn(
    ['test', 'tasks', taskId, 'userAnswer'],
    value
  );
}

export default updateTaskInput;
