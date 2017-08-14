import { fromJS } from 'immutable';
import shortid from 'shortid';

const initialState = fromJS({
  lists: [
    {
      id: shortid.generate(),
      name: 'default',
      lang: null,
      words: [
        {
          id: shortid.generate(),
          langFrom: 'en',
          langTo: 'ru',
          original: 'death',
          translations: ['смерть', 'гибель', 'конец']
        },
        {
          id: shortid.generate(),
          langFrom: 'en',
          langTo: 'ru',
          original: 'grip',
          translations: ['рукоятка', 'ручка', 'захват']
        }
      ]
    }
  ],
  test: {
    state: 'creating'
  }
});

export default initialState;
