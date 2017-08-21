import { fromJS } from 'immutable';
import shortid from 'shortid';

const initialState = fromJS({
  lists: [
    {
      id: shortid.generate(),
      name: 'default',
      langFrom: null,
      langTo: null,
      words: [
        {
          id: shortid.generate(),
          original: 'cuckoo',
          isLearnt: false,
          translations: ['кукушка']
        }
      ]
    },
    {
      id: shortid.generate(),
      name: 'french words',
      langFrom: 'fr',
      langTo: null,
      words: []
    },
    {
      id: shortid.generate(),
      name: 'english words',
      langFrom: 'en',
      langTo: null,
      words: []
    },
    {
      id: shortid.generate(),
      name: 'en - fr',
      langFrom: 'en',
      langTo: 'fr',
      words: []
    }
  ],
  test: {
    state: 'creating'
  }
});

export default initialState;
