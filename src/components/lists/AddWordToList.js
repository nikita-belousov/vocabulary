import React, { Component } from 'react'
import { List, fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'
import shortid from 'shortid'

import * as utils from './../../utils'
import * as actions from './../../actions'

import styles from '../../styles/components/AddWordToList.css'

import {
  Button
} from './../commonComponents'

import {
  WordForm
} from './../listsComponents'

let AddWordToList = class extends Component {
  state = {
    data: fromJS({
      isAdding: false,
      form: {
        'original': '',
        'translations': ''
      }
    })
  }

  tryAdd = () => {
    if (this.isDataValid(this.state.data.get('form')))
      this.add()
  }

  add() {
    const form = this.state.data.get('form');

    this.props.dispatch(
      actions.addWordToList(
        this.props.listId,
        fromJS({
          original: utils.getStringBase(form.get('original')),
          translations: utils.stringToArray(form.get('translations'))
        })
      )
    )

    this.toggleAddingState()
    this.clearFormData()
  }

  cancel = () => {
    this.toggleAddingState()
    this.clearFormData()
  }

  isDataValid() {
    const form = this.state.data.get('form')

    if ((utils.getStringBase(form.get('original')) !== '') &&
        (utils.getStringBase(form.get('translations')) !== '')) {
      return true
    }
    return false
  }

  clearFormData() {
    this.setState(({ data }) => ({
      data: data
        .setIn(['form', 'original'], '')
        .setIn(['form', 'translations'], '')
    }))
  }

  toggleAddingState = () => {
    this.setState(({ data }) => ({
      data: data.update('isAdding', value => !value)
    }))
  }

  handleAddFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
      data: data.setIn(['form', name], value)
    }))
  }

  render() {
    const state = this.state.data
    const isAdding = state.get('isAdding')

    return (
      <div>
        {isAdding &&
          <WordForm
            original={state.getIn(['form', 'original'])}
            translations={state.getIn(['form', 'translations'])}
            onChange={this.handleAddFormChange}
            onCancel={this.cancel}
            onSubmit={this.tryAdd}
          >
            Add word
          </WordForm>}

          {!isAdding &&
            <div className={styles['add-button-wrapper']}>
              <Button
                type="add"
                onClick={!isAdding && this.toggleAddingState}
              >
                Add word
              </Button>
            </div>}
      </div>
    )
  }
}

AddWordToList = connect()(AddWordToList)

export default AddWordToList
