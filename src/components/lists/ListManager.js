import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'

import * as utils from './../../utils'
import * as actions from './../../actions'

import {
  CreateList,
  ListLabel
} from './../listsComponents'

import styles from './../../styles/components/ListManager.css'

let ListManager = class extends Component {
  state = {
    data: fromJS({
      addForm: {
        name: '',
        description: '',
        langFrom: '',
        langTo: ''
      },
      isAdding: false,
    })
  }

  startAddingList = () => {
    this.setState(({ data }) => ({
      data: data.set('isAdding', true)
    }))
  }

  stopAddingList = () => {
    this.setState(({ data }) => ({
      data: data.set('isAdding', false)
    }))
  }

  tryCreatingList = () => {
    const addForm = this.state.data.get('addForm').toJS()

    if (this.isAddFormValid(addForm)) {
      this.createList(addForm)
    } else console.log('error creating list')
  }

  isAddFormValid(addForm) {
    return utils.getStringBase(addForm.name) !== ''
  }

  createList(options) {
    this.props.dispatch(actions.createList(options))
    this.stopAddingList()
  }

  onAddListFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
        data: data.setIn(['addForm', name], value)
    }))
  }

  render() {
    const { lists } = this.props
    const state = this.state.data

    return (
      <div>
        {/* <CreateList
          isAdding={isAdding}
          onFormChange={this.onAddListFormChange}
          onCreate={this.startAddingList}
          onCancel={this.stopAddingList}
          onConfirm={this.tryCreatingList}
        /> */}

        {/* {lists.map(list => (
          <List
            key={list.id}
            id={list.id}
            name={list.name}
            description={list.description}
            lang={list.lang}
            words={list.words}
          />
        ))} */}

        {lists.map(list => (
          <ListLabel
            key={list.get('id')}
            list={list}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ lists: state.get('lists') })

ListManager = connect(
    mapStateToProps,
    null
)(ListManager)

export default ListManager
