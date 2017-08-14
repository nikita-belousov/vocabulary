import { fromJS, toJS } from 'immutable';
import shortid from 'shortid';
import * as utils from './../../utils';

function shuffleTasks(tasks) {
  const length = tasks.length;
  const shuffled = [];

  const nums = [];
  for (let i = 0; i < length; i++) {
    nums[i] = i;
  }

  for (let i = 0; i < length; i++) {
    const index = utils.getRandomArbitrary(0, nums.length);
    shuffled[nums[index]] = tasks[i];
    nums.splice(index, 1);
  }

  return shuffled;
}

function createTasks(
  state,
  lists,
  options
) {
  return lists.reduce((res, listId) => {
    state
      .get('lists')
      .find(list => list.get('id') === listId)
      .get('words')
      .forEach(word => {
        const task = createTask(
          listId,
          word,
          options
        );
        res.push(task);
      })

    return res;
  }, []);
}

function createTask(
  listId,
  word,
  options
) {
  const task = {};

  const {
    id,
    original,
    translations
  } = word.toJS();

  task.id = shortid.generate();
  task.listId = listId;
  task.wordId = id;
  task.text = word.getIn(['translations', 0])
  task.correct = word.get('original');
  task.userAnswer = '';

  return task;
}

function createTest(
  state,
  neededLists,
  options
) {
  let tasks = createTasks(
    state,
    neededLists,
    options
  );
  tasks = utils.shuffleArray(tasks);

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
    );
}

export default createTest;
