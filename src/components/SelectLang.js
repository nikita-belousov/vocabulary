import React, { Component } from 'react';
import * as api from './../utils/dictionaryAPI';

class SelectLang extends Component {
  componentWillMount() {
    const avaibleLangs = api.AVAIBLE_LANGS;

    this.options = avaibleLangs.reduce((res, lang) => {
      const newLang = {};

      Object.defineProperty(newLang, 'value',
        Object.getOwnPropertyDescriptor(lang, 'code'));

      Object.defineProperty(newLang, 'name',
        Object.getOwnPropertyDescriptor(lang, 'lang'));

      res.push(newLang);
      return res;
    }, []);
  }

  render() {
    const {
      name,
      value,
      onChange,
      placeholder
    } = this.props;

    return (
      <div>
        <label htmlFor={name}>
          {this.props.children}
        </label>
        {' '}
        <select
          label="hey"
          name={name}
          value={value}
          onChange={onChange}
        >
          {placeholder &&
            <option value="" disabled selected>
              {placeholder}
            </option>}
          {this.options.map(option => {
            const { value, name } = option;

            return (
              <option
                key={value}
                value={value}
              >
                {name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default SelectLang;
