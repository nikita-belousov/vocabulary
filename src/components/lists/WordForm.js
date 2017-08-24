import React, { Component } from 'react'
import styles from '../../styles/components/AddWordForm.css'

import {
  Button,
  CoupledTextInputs,
  TextInput
} from './../commonComponents'

class WordForm extends Component {
  render() {
    const {
      original,
      translations,
      onChange,
      onCancel,
      onSubmit
    } = this.props

    return (
      <div className={styles.wrapper}>
        <CoupledTextInputs>
          <TextInput
            type="text"
            name="original"
            value={original}
            onChange={onChange}
            placeholder="Word"
          />

          <TextInput
            type="text"
            name="translations"
            value={translations}
            onChange={onChange}
            placeholder="Translations separated by commas"
          />
        </CoupledTextInputs>

        <Button onClick={onSubmit}>
          {this.props.children}
        </Button>

        <Button
          type="link"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    )
  }
}

export default WordForm
