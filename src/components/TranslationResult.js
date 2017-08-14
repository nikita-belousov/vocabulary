import React, { Component } from 'react';

class TranslationResult extends Component {
  render() {
    const {
      isAdding,
      result,
      onCheckboxChange
    } = this.props;

    return (
      <div>
        <h2>{result.original}</h2>

        {isAdding &&
          <i>Choose translations to save</i>}

        {result.poses.map(pos => (
          <ul key={pos.pos} style={{ listStyle: 'none' }}>
            <li>
              <b>{pos.pos}</b>
            </li>
            {pos.translations.map(tr => (
              <li key={tr}>
                {isAdding &&
                  <input
                    type="checkbox"
                    value={tr}
                    onChange={onCheckboxChange}
                  />}
                {tr}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }
}

export default TranslationResult;
