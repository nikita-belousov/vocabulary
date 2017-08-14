import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class AddWordToListFromTranslator extends Component {
  renderListSelect() {
    const {
      listValue,
      onChange,
      avaibleLists
    } = this.props;

    return (
      <select
        name="list"
        value={listValue}
        onChange={onChange}
      >
        <option value="" disabled selected>
          Select list
        </option>
        {avaibleLists.map(list => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const {
      isAdding,
      onAdd,
      onCancel,
      onConfirm
    } = this.props;

    return (
      <div>
        {isAdding && this.renderListSelect()}
        {isAdding ? (
          <div>
            <button onClick={onConfirm}>
              Confirm
            </button>
            <button onClick={onCancel}>
              Cancel
            </button>
          </div>
        ) :
        (
          <button onClick={onAdd}>
            Add to list
          </button>
        )}
      </div>
    );
  }
}

export default AddWordToListFromTranslator;
