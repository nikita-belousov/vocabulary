import { fromJS } from 'immutable';
import shortid from 'shortid';

const initialState = fromJS({
  lists: [
    {
      id: 'HJYwUROd-',
      name: 'default',
      langFrom: null,
      langTo: null,
      words: [
        {
          id: shortid.generate(),
          original: 'cuckoo',
          learningState: 'halfLearnt',
          translations: ['кукушка']
        },
        {
          id: shortid.generate(),
          original: 'something',
          learningState: 'learnt',
          translations: ['один', 'два', 'три']
        }
      ]
    }
  ],
  test: {
    state: 'creating'
  }
});

export default initialState;
