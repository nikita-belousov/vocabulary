import React, { Component } from 'react';
import { fromJS, toJS } from 'immutable';
import { connect } from 'react-redux';

import * as utils from './../utils';
import * as actions from './../actions';

let Word = class extends Component {
  state = {
    data: fromJS({
      isEditing: false,
      editingForm: {
        original: this.props.original,
        translations: this.props.translations.join(', ')
      }
    })
  }

  editWord = () => {
    this.setState(prevState => {
      return {
        data: prevState.data.set('isEditing', true)
      };
    });
  }

  saveEditedWord = () => {
    const { listId, id } = this.props;

    const newInfo = this.state.data.get('editingForm')
      .toJS();

    newInfo.translations = utils.stringToArray(
      newInfo.translations
    );

    this.props.dispatch(
      actions.updateWordInfo(
        listId,
        id,
        fromJS(newInfo)
      )
    );

    this.setState(prevState => {
      return {
        data: prevState.data.set('isEditing', false)
      };
    });
  }

  removeWordFromList = () => {
    const { listId, id } = this.props;

    this.props.dispatch(
      actions.removeWordFromList(
        listId,
        id
      )
    );
  }

  renderWord(original, translations) {
    return (
      <div>
        <b>{original}</b>
        {' -- '}
        <span>{translations}</span>
        {' '}
        <button onClick={this.editWord}>
          Edit
        </button>
        {' '}
        <button onClick={this.removeWordFromList}>
          Delete
        </button>
      </div>
    );
  }

  renderEditingWord() {
    const {
      original,
      translations
    } = this.state.data.get('editingForm').toJS();

    return (
      <div>
        <input
          name="original"
          type="text"
          value={original}
          onChange={this.onEditingFormChange}
        />
        {' -- '}
        <input
          name="translations"
          type="text"
          value={translations}
          onChange={this.onEditingFormChange}
        />
        {' '}
        <button onClick={this.saveEditedWord}>
          Save
        </button>
      </div>
    );
  }

  onEditingFormChange = (e) => {
    const { name, value } = e.target;

    this.setState(prevState => {
      return {
        data: prevState.data.setIn(
          ['editingForm', name],
          value
        )
      };
    });
  }

  render() {
    const {
      original,
      translations,
      isLearnt,
    } = this.props;

    const isEditing = this.state.data.get('isEditing');

    const translationsString = translations.map((tr, index) => {
      return index === translations.length - 1 ?
        tr : tr + ', ';
    });

    return (
      <div style={{ margin: '1em 0' }}>
        {isEditing ? this.renderEditingWord(original, translationsString)
          : this.renderWord(original, translationsString)}
      </div>
    );
  }
}

Word = connect()(Word);

export default Word;
