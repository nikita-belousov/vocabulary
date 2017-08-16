import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  Select,
  Button,
} from './../commonComponents'

class AddWordToList extends Component {
  avaibleListsToOptions(lists) {
    return lists.reduce((res, list) => {
      res.push({
        value: list.id,
        name: list.name
      })

      return res
    }, [])
  }

  renderListSelect() {
    const {
      listValue,
      onChange,
      avaibleLists
    } = this.props;

    const options = this.avaibleListsToOptions(avaibleLists)

    return (
      <Select
        name="list"
        options={options}
        value={listValue}
        defaultValue="Select list"
        onChange={onChange}
      />
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
            <Button onClick={onConfirm}>
              Confirm
            </Button>

            <Button onClick={onCancel}>
              Cancel
            </Button>
          </div>
        ) :
        (
          <Button onClick={onAdd}>
            Add to list
          </Button>
        )}
      </div>
    );
  }
}

export default AddWordToList;
