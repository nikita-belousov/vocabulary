import React, { Component } from 'react';
import SelectLang from './SelectLang';

class CreateList extends Component {
  render() {
    const {
      isAdding,
      onCreate,
      onCancel,
      onFormChange,
      onConfirm
    } = this.props;

    return (
      <div>
        <button onClick={isAdding ? onCancel : onCreate}>
          {isAdding ? 'Cancel' : 'Create new'}
        </button>
        {isAdding &&
          <div>
            <input
              onChange={onFormChange}
              name="name"
              type="text"
              placeholder="Name"
            /><br/>
            <textarea
              onChange={onFormChange}
              name="description"
              cols="30" rows="5"
              placeholder="Description"
            /><br/>
            <SelectLang
              name="lang"
              onChange={onFormChange}
              placeholder="Select lang"
            />
            <button onClick={onConfirm}>
              Confirm
            </button>
          </div>}
      </div>
    );
  }
}

export default CreateList;
