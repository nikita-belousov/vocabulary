import { fromJS } from 'immutable';
import shortid from 'shortid';

const initialState = fromJS({
  lists: [
    {
      id: 'HJYwUROd-',
      name: 'default',
      langFrom: null,
      langTo: null,
      words: []
    }
  ],
  test: {
    state: 'creating'
  }
});

export default initialState;
