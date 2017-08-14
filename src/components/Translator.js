import React, { Component } from 'react';
import { fromJS, toJS } from 'immutable';
import { connect } from 'react-redux';

import * as actions from './../actions';
import * as api from './../utils/dictionaryAPI';
import shortid from 'shortid';

import TranslationForm from './TranslationForm';
import TranslationResult from './TranslationResult';
import AddWordToListFromTranslator from './AddWordToListFromTranslator';
import Loading from './Loading';

let Translator = class extends Component {
  state = {
    data: fromJS({
      translationForm: {
        word: '',
        langFrom: 'en',
        langTo: 'ru'
      },
      isAdding: false,
      addForm: {
        list: '',
        checkedTranslations: []
      },
      result: null,
      isLoading: false
    })
  }

  onTranslationFormChange = (e) => {
    const { name, value } = e.target;

    this.setState(({ data }) => {
      return {
        data: data.setIn(['translationForm', name], value)
      };
    });
  }

  onAddFormChange = (e) => {
    const { value } = e.target;

    this.setState(({data}) => {
      return {
        data: data.setIn(
          ['addForm', 'list'],
          value
        )
      };
    });
  }

  prepareAdding = () => {
    this.setState(prevState => {
      return {
        data: prevState.data.set('isAdding', true)
      };
    });
  }

  cancelAdding = () => {
    this.setState(prevState => {
      return {
        data: prevState.data.set('isAdding', false)
      };
    });
  }

  tryAddWordToList = () => {
    const data = this.state.data.toJS();

    if ((data.addForm.list !== '') &&
        (data.addForm.checkedTranslations.length > 0)) {
      this.addWordToList(
        data.addForm.list,
        data.result,
        data.addForm.checkedTranslations
      );
    } else {
      console.log('error adding word');
    }
  }

  addWordToList(list, result, checkedTranslations) {
    const word = {
      original: result.original,
      translations: checkedTranslations
    };

    this.props.dispatch(actions.addWordToList(
      list,
      fromJS(word)
    ));
  }

  swapLangs = () => {
    const { data } = this.state;

    const from = data.getIn(['translationForm', 'langFrom']);
    const to = data.getIn(['translationForm', 'langTo']);

    this.setState(({ data }) => {
      return {
        data: data
          .setIn(['translationForm', 'langFrom'], to)
          .setIn(['translationForm', 'langTo'], from)
      };
    });
  }

  onTranslationCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      this.setState(prevState => {
        return {
          data: prevState.data.updateIn(
            ['addForm', 'checkedTranslations'],
            list => list.push(value)
          )
        };
      })
    } else {
      this.setState(prevState => {
        return {
          data: prevState.data.updateIn(
            ['addForm', 'checkedTranslations'],
            list => list.filter(item => {
              return item !== value
            })
          )
        };
      });
    }
  }

  translate = (word, from, to) => {
    api.lookup(word, from, to)
      .then(res => this.setState(({ data }) => {
        return {
          data: data.set('result', fromJS(res))
        };
      }));
  }

  renderResult(result) {
    const { data } = this.state;
    const avaibleLists = this.props.lists.toJS();

    return (
      <div>
        <TranslationResult
          isAdding={data.get('isAdding')}
          result={result}
          onCheckboxChange={this.onTranslationCheckboxChange}
        />
        <AddWordToListFromTranslator
          isAdding={data.get('isAdding')}
          onAdd={this.prepareAdding}
          onCancel={this.cancelAdding}
          onConfirm={this.tryAddWordToList}
          listValue={data.getIn(['addForm', 'list'])}
          onChange={this.onAddFormChange}
          avaibleLists={avaibleLists}
        />
      </div>
    );
  }

  render() {
    const { data } = this.state;

    let result = data.get('result');
    result = result && result.toJS();

    const isLoading = data.get('isLoading');

    return (
      <div>
        <TranslationForm
          onTranslate={this.translate}
          onChange={this.onTranslationFormChange}
          onSwap={this.swapLangs}
          word={data.getIn(['translationForm', 'word'])}
          langFrom={data.getIn(['translationForm', 'langFrom'])}
          langTo={data.getIn(['translationForm', 'langTo'])}
        />

        {result &&
          (result.poses ? this.renderResult(result) : 'Not found...')}

        {isLoading &&
          <Loading maxDots={3} interval={500}/>}
      </div>
    );
  }
};

Translator = connect(
  (state) => ({
    lists: state.get('lists')
  }), null
)(Translator);

export default Translator;
