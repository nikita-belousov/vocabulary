import React, { Component } from 'react'
import { List, fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'
import shortid from 'shortid'

import * as utils from './../../utils'
import * as actions from './../../actions'

import {
  Button
} from './../commonComponents'

import {
  WordInputGroup
} from './../listsComponents'

let AddWordsToList = class extends Component {
  state = {
    data: fromJS({
      isAdding: false,
      wordInputGroups: []
    })
  }

  tryAddWordsToList = () => {
    if (this.isInputGroupsValid) this.addWordsToList()
  }

  isInputGroupsValid() {
    let isValid = true

    const groups = this.state.data.get('wordInputGroups')

    const validated = groups.map(group => {
      const {
        original,
        translations
      } = group.get('form').toJS()

      if (utils.getStringBase(original) === '' ||
          utils.getStringBase(translations) === '') {
        isValid = false
        return group.set('fillingError', true)
      } else {
        return group.set('fillingError', false)
      }
    })

    this.setState(prevState => ({
      data: prevState.data.set(
        'wordInputGroups',
        validated
      )
    }))

    return isValid
  }

  addWordsToList() {
    const groups = this.state.data
      .get('wordInputGroups')
      .toJS()

    groups.forEach(group => {
      const { original, translations } = group.form

      const word = {
        original,
        translations: utils.stringToArray(translations)
      }

      this.props.dispatch(
        actions.addWordToList(this.props.listId, fromJS(word))
      )
    })

    this.setState(({ data }) => ({
      data: data
        .set('isAdding', false)
        .set('wordInputGroups', List())
    }))
  }

  cancelAdding = () => {
    this.stopAdding()
  }

  startAdding = () => {
    this.setState(prevState => ({
      data: prevState.data.set('isAdding', true)
    }))

    this.addWordInputGroup()
  }

  stopAdding = () => {
    this.setState(prevState => ({
      data: prevState.data.set('isAdding', false)
    }))
  }

  handleWordInputGroupChange = (e) => {
    const { name, value } = e.target
    const groupId = e.target.dataset.group

    this.setState(prevState => ({
      data: prevState.data.updateIn(
        ['wordInputGroups', groupId, 'form'],
        form => form.set(name, value)
      )
    }))
  }

  addWordInputGroup = () => {
    const newGroup = {
      form: {
        original: '',
        translations: ''
      },
      fillingError: false
    }

    this.setState(prevState => ({
      data: prevState.data.update(
        'wordInputGroups',
        groups => groups.push(fromJS(newGroup))
      )
    }))
  }

  removeWordInputGroup = (id) => {
    this.setState(prevState => ({
      data: prevState.data.update(
        'wordInputGroups',
        groups => groups.delete(id)
      )
    }), this.checkIfNoGroupsLeft)
  }

  checkIfNoGroupsLeft() {
    const wordInputGroups = this.state.data
      .get('wordInputGroups')
      .toJS()

    if (wordInputGroups.length === 0) {
      this.stopAdding()
    }
  }

  renderAddingForm() {
    const state = this.state.data.toJS()
    const { wordInputGroups } = state

    let id = -1

    return (
      <div>
        {wordInputGroups.map(group => {
          id++

          return (
            <WordInputGroup
              key={id}
              id={id}
              originalValue={group.original}
              translationsValue={group.translations}
              fillingError={group.fillingError}
              onChange={this.handleWordInputGroupChange}
              onRemove={this.removeWordInputGroup}
            />
          )
        })}

        <Button onClick={this.addWordInputGroup}>
          +
        </Button>

        <Button onClick={this.tryAddWordsToList}>
          Confirm
        </Button>
      </div>
    )
  }

  renderAddButton() {
    return (
      <Button onClick={this.startAdding}>
        Add word
      </Button>
    )
  }

  render() {
    const isAdding = this.state.data.get('isAdding')

    return (
      <div>
        {isAdding ?
          this.renderAddingForm() :
          this.renderAddButton()}
      </div>
    )
  }
}

AddWordsToList = connect()(AddWordsToList)

export default AddWordsToList
