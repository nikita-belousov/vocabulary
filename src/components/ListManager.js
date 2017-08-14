import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';

import * as actions from './../actions';
import CreateList from './CreateList';
import List from './List';

let ListManager = class extends Component {
  state = {
    data: fromJS({
      addForm: {
        name: '',
        description: '',
        lang: ''
      },
      isAdding: false,
    })
  }

  prepareCreatingList = () => {
    this.setState(prevState => {
      return {
        data: prevState.data.set('isAdding', true)
      };
    });
  }

  cancelCreatingList = () => {
    this.setState(prevState => {
      return {
        data: prevState.data.set('isAdding', false)
      };
    });
  }

  tryCreatingList = () => {
    const addForm = this.state.data
      .get('addForm').toJS();

    if (addForm.name !== '') {
      this.createList(addForm);
    } else console.log('error creating list');
  }

  createList({ name, description, lang }) {
    this.props.dispatch(
      actions.createList({
        name,
        description,
        lang
      })
    );
  }

  onAddListFormChange = (e) => {
    const { name, value } = e.target;

    this.setState(prevState => {
      return {
        data: prevState.data.setIn(
          ['addForm', name],
          value
        )
      };
    });
  }

  render() {
    const { lists } = this.props;
    const state = this.state.data.toJS();

    const { openedList, isAdding } = state;

    return (
      <div style={{
        marginTop: '2em'
      }}>
        <CreateList
          isAdding={isAdding}
          onFormChange={this.onAddListFormChange}
          onCreate={this.prepareCreatingList}
          onCancel={this.cancelCreatingList}
          onConfirm={this.tryCreatingList}
        />

        {lists.map(list => (
          <List
            key={list.id}
            id={list.id}
            name={list.name}
            description={list.description}
            lang={list.lang}
            words={list.words}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const lists = state.get('lists').toJS();
  return { lists };
};

ListManager = connect(
    mapStateToProps,
    null
)(ListManager);

export default ListManager;
