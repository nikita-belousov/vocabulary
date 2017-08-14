import React, { Component } from 'react';
import * as api from './../utils/dictionaryAPI';
import SelectLang from './SelectLang';

class LangInput extends Component {
  render() {
    const {
      valueFrom,
      valueTo,
      onChange,
      onSwap
    } = this.props;

    return (
      <div>
        <SelectLang
          name="langFrom"
          value={valueFrom}
          onChange={onChange}
        >
          From:
        </SelectLang>
        <SelectLang
          name="langTo"
          value={valueTo}
          onChange={onChange}
        >
          To:
        </SelectLang>
        <button onClick={onSwap}>Swap</button>
      </div>
    );
  }
}

export default LangInput;
