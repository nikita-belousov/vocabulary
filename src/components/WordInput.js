import React, { Component } from 'react';

class WordInput extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <input
        name="word"
        value={value}
        onChange={(e) => onChange(e)}
      />
    );
  }
}

export default WordInput;
