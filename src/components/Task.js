import React, { Component } from 'react';

class Task extends Component {
  render() {
    const {
      id,
      text,
      inputValue,
      onInputChange
    } = this.props;

    return (
      <fieldset style={{ margin: '1em 0' }}>
        <legend>{text}</legend>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e, id)}
        />
      </fieldset>
    );
  }
}

export default Task;
