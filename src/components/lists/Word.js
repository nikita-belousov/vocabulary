import React, { Component } from 'react'
import { fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'

import * as utils from './../../utils'
import * as actions from './../../actions'

import {
  Button,
  TextInput
} from './../commonComponents'

let Word = class extends Component {
  state = {
    data: fromJS({
      isEditing: false,
      editingForm: {
        original: this.props.original,
        translations: this.props.translations.join(', ')
      }
    })
  }

  editWord = () => {
    this.setState(({ data }) => ({
      data: data.set('isEditing', true)
    }))
  }

  saveEditedWord = () => {
    const { listId, id } = this.props

    const newInfo = this.state.data
      .get('editingForm')
      .toJS()

    newInfo.translations = utils.stringToArray(newInfo.translations)

    this.props.dispatch(
      actions.updateWordInfo(listId, id, fromJS(newInfo))
    )

    this.setState(({ data }) => ({
      data: data.set('isEditing', false)
    }))
  }

  removeWordFromList = () => {
    const { listId, id } = this.props

    this.props.dispatch(
      actions.removeWordFromList(listId, id)
    )
  }

  renderWord(original, translations) {
    const { isLearnt } = this.props

    return (
      <div>
        <b style={{ color: isLearnt ? 'green' : 'inherit' }}>
          {original}
        </b>
        {' — '}
        <span>{translations}</span>
        {' '}
        <Button onClick={this.editWord}>
          Edit
        </Button>
        {' '}
        <Button onClick={this.removeWordFromList}>
          Delete
        </Button>
      </div>
    )
  }

  renderEditingWord() {
    const {
      original,
      translations
    } = this.state.data.get('editingForm').toJS()

    return (
      <div>
        <TextInput
          name="original"
          value={original}
          onChange={this.onEditingFormChange}
        />
        {' -- '}
        <TextInput
          name="translations"
          value={translations}
          onChange={this.onEditingFormChange}
        />
        {' '}
        <Button onClick={this.saveEditedWord}>
          Save
        </Button>
      </div>
    )
  }

  onEditingFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
      data: data.setIn(['editingForm', name], value)
    }))
  }

  render() {
    const {
      original,
      translations,
      isLearnt,
    } = this.props

    const isEditing = this.state.data.get('isEditing')

    const translationsString = translations.map((tr, index) =>
      index === translations.length - 1 ? tr : tr + ', '
    )

    return (
      <div style={{ margin: '1em 0' }}>
        {isEditing ? this.renderEditingWord(original, translationsString)
          : this.renderWord(original, translationsString)}
      </div>
    )
  }
}

Word = connect()(Word)

export default Word
