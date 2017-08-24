import React, { Component } from 'react'
import { fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'

import * as utils from './../../utils'
import * as actions from './../../actions'

import {
  Button
} from '../commonComponents'

import {
  AddListForm
} from '../listsComponents'

let AddList = class extends Component {
  state = {
    data: fromJS({
      isAdding: false,
      form: {
        name: ''
      }
    })
  }

  toggleAddingState = () => {
    this.setState(({ data }) => ({
      data: data.update('isAdding', value => !value)
    }))
  }

  tryAdd = () => {
    if (this.isFormDataValid())
      this.add()
  }

  add() {
    const options = this.state.data.get('form').toJS()

    this.props.dispatch(
      actions.createList(options)
    )

    this.toggleAddingState()
    this.clearFormData()
  }

  isFormDataValid() {
    let isValid = true

    this.state.data.get('form')
      .forEach(field => {
        if (field === '')
          isValid = false
      })

    return isValid
  }

  onFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
      data: data.setIn(['form', name], value)
    }))
  }

  cancel = () => {
    this.toggleAddingState()
    this.clearFormData()
  }

  clearFormData() {
    this.setState(({ data }) => ({
      data: data.update('form', form =>
        form.map(field => ''))
    }))
  }

  render() {
    const isAdding = this.state.data.get('isAdding')
    const form = this.state.data.get('form')

    return (
      <div>
        {isAdding &&
          <AddListForm
            name={form.get('name')}
            onChange={this.onFormChange}
            onCancel={this.cancel}
            onAdd={this.tryAdd}
          />}

        {!isAdding &&
          <Button
            type="add"
            onClick={this.toggleAddingState}
          >
            Add list
          </Button>}
      </div>
    )
  }
}

AddList = connect()(AddList)

export default AddList
