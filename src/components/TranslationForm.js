import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

import LangInput from './LangInput';
import WordInput from './WordInput';

class TranslationForm extends Component {
  render() {
    const {
      langFrom,
      langTo,
      word,
      onChange,
      onTranslate,
      onSwap,
      state
    } = this.props;

    return (
      <div>
        <LangInput
          valueFrom={langFrom}
          valueTo={langTo}
          onChange={onChange}
          onSwap={onSwap}
        />
        <WordInput value={word} onChange={onChange} />
        <button onClick={() => onTranslate(
          word,
          langFrom,
          langTo
        )}>
          Translate
        </button>
      </div>
    );
  }
};

export default TranslationForm;
