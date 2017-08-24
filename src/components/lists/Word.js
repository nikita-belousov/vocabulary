import React, { Component } from 'react'
import { fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'

import * as utils from './../../utils'
import * as actions from './../../actions'

import styles from '../../styles/components/Word.css'

import {
  WithHover
} from './../HOCs'

import {
  Button,
  TextInput,
  WordLearningState,
  ActionsMenu
} from './../commonComponents'

import {
  WordForm
} from './../listsComponents'

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

  componentWillReceiveProps(newProps) {
    this.setState(({ data }) => ({
      data: data.update('editingForm', form =>
        form
          .set('original', newProps.original)
          .set('translations', newProps.translations.join(', '))
      )
    }))
  }

  edit = () => {
    this.setState(({ data }) => ({
      data: data.set('isEditing', true)
    }))
  }

  cancelEditing = () => {
    this.setState(({ data }) => ({
      data: data.set('isEditing', false)
    }))

    this.resetEditingData()
  }

  resetEditingData() {
    this.setState(({ data }) => ({
      data: data.set('editingForm', fromJS({
        original: this.props.original,
        translations: this.props.translations.join(', ')
      }))
    }))
  }

  saveEditedWord = () => {
    const { listId, id } = this.props

    const newInfo =
      this.state.data.get('editingForm').toJS()
    newInfo.translations = utils.stringToArray(newInfo.translations)

    this.props.dispatch(
      actions.updateWordInfo(listId, id, fromJS(newInfo))
    )

    this.setState(({ data }) => ({
      data: data.set('isEditing', false)
    }))
  }

  delete = () => {
    const { listId, id } = this.props

    this.props.dispatch(
      actions.removeWordFromList(listId, id)
    )
  }

  onEditingFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
      data: data.setIn(['editingForm', name], value)
    }))
  }

  renderWord(original, translations) {
    const { isHovered, learningState } = this.props

    const menuActions = [
      { name: 'Edit word', handler: this.edit },
      { name: 'Delete word', handler: this.delete }
    ]

    return (
      <div
        ref={node => this.wrapper = node}
        className={styles.inner}
      >
        <WordLearningState state={learningState} />

        <span className={styles.original}>
          {original}
        </span>

        <span className={styles.translations}>
          {translations}
        </span>

        <div className={styles['menu-wrapper']}>
          <ActionsMenu
            isHovered={isHovered}
            actions={menuActions}
            align="right"
          />
        </div>
      </div>
    )
  }

  renderEditingForm() {
    const {
      original,
      translations
    } = this.state.data.get('editingForm').toJS()

    return (
      <div className={styles['editing-form-wrapper']}>
        <WordForm
          original={original}
          translations={translations}
          onChange={this.onEditingFormChange}
          onCancel={this.cancelEditing}
          onSubmit={this.saveEditedWord}
        >
          Save
        </WordForm>
      </div>
    )
  }

  render() {
    const {
      original,
      translations,
      isLearnt,
    } = this.props

    const isEditing = this.state.data.get('isEditing')
    const translationsString = translations.join(', ')

    return (
      <div className={styles.word}>
        {isEditing ? this.renderEditingForm(original, translationsString)
          : this.renderWord(original, translationsString)}
      </div>
    )
  }
}

Word = connect()(Word)
Word = WithHover(Word)

export default Word
