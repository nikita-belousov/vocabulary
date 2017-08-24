import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'

import * as utils from './../../utils'
import * as actions from './../../actions'

import {
  ListLabel,
  AddList,
  FilterLists
} from './../listsComponents'

import styles from '../../styles/components/ListsManager.css'

let ListsManager = class extends Component {
  state = {
    data: fromJS({
      filterForm: {
        name: ''
      },
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

  onFilterFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
      data: data.setIn(['filterForm', name], value)
    }))
  }

  getFilteredLists() {
    const filterName = this.state.data
      .getIn(['filterForm', 'name'])

    return this.props.lists.filter(list =>
      list.get('name')
        .toLowerCase()
        .includes(
          utils.getStringBase(filterName)
        )
    )
  }

  render() {
    const { lists } = this.props
    const state = this.state.data
    const filteredLists = this.getFilteredLists(lists)

    const listActions = [
      { name: 'Edit list', handle: this.edit },
      { name: 'Delete list', handle: this.delete }
    ]

    return (
      <div>
        <FilterLists
          name={state.getIn(['filterForm', 'name'])}
          onChange={this.onFilterFormChange}
        />

        {filteredLists.map(list => (
          <ListLabel
            key={list.get('id')}
            list={list}
            listActions={listActions}
          />
        ))}

        <div className={styles['add-wrapper']}>
          <AddList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ lists: state.get('lists') })

ListsManager = connect(
    mapStateToProps,
    null
)(ListsManager)

export default ListsManager
