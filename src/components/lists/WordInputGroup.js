import React, { Component } from 'react'

import {
  Button,
  TextInput
} from './../commonComponents'

class WordInputGroup extends Component {
  renderFillingError = () => (
    <div style={{
      position: 'absolute',
      top: '-1.2em',
      fontSize: '.8em',
      color: 'red'
    }}>
      This field is required
    </div>
  )

  render() {
    const {
      id,
      originalValue,
      translationsValue,
      onChange,
      onRemove,
      fillingError
    } = this.props

    return (
      <div style={{
        margin: '1.6em',
        position: 'relative'
      }}>
        {fillingError && this.renderFillingError()}

        <TextInput
          type="text"
          name="original"
          value={originalValue}
          onChange={onChange}
          placeholder="original"
          data-group={id}
        />
        {' -- '}
        <TextInput
          type="text"
          name="translations"
          value={translationsValue}
          onChange={onChange}
          placeholder="translations"
          data-group={id}
        />
        {' '}
        <Button onClick={() => onRemove(id)}>
          Remove
        </Button>
      </div>
    )
  }
}

export default WordInputGroup
