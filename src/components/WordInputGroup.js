import React, { Component } from 'react';

class WordInputGroup extends Component {
  renderFillingError() {
    return (
      <div style={{
        position: 'absolute',
        top: '-1.2em',
        fontSize: '.8em',
        color: 'red'
      }}>
        This field is required
      </div>
    );
  }

  render() {
    const {
      id,
      originalValue,
      translationsValue,
      onChange,
      onRemove,
      fillingError
    } = this.props;

    return (
      <div style={{
        margin: '1.6em',
        position: 'relative'
      }}>
        {fillingError && this.renderFillingError()}
      
        <input
          type="text"
          name="original"
          value={originalValue}
          onChange={onChange}
          placeholder="original"
          data-group={id}
          style={{
            width: '5em'
          }}
        />
        {' -- '}
        <input
          type="text"
          name="translations"
          value={translationsValue}
          onChange={onChange}
          placeholder="translations"
          data-group={id}
          style={{
            width: '16em'
          }}
        />
        {' '}
        <button onClick={() => onRemove(id)}>
          Remove
        </button>
      </div>
    );
  }
}

export default WordInputGroup;
