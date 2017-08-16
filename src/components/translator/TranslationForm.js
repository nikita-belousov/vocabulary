import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

import {
  LangsInput
} from './../translatorComponents'

import {
  TextInput,
  Button
} from './../commonComponents'

class TranslationForm extends Component {
  render() {
    const {
      langFrom,
      langTo,
      word,
      onChange,
      onTranslate,
      onSwap,
      state
    } = this.props

    return (
      <div>
        <LangsInput
          valueFrom={langFrom}
          valueTo={langTo}
          onChange={onChange}
          onSwap={onSwap}
        />

        <TextInput
          name="word"
          value={word}
          onChange={onChange}
        />

        <Button onClick={() => onTranslate(word, langFrom, langTo)}>
          Translate
        </Button>
      </div>
    )
  }
}

export default TranslationForm
