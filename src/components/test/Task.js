import React, { Component } from 'react'

import {
  TextInput,
  RadioGroup
} from './../commonComponents'

class Task extends Component {
  renderText() {
    const {
      inputValue,
      onInputChange,
      id
    } = this.props

    return (
      <TextInput
        value={inputValue}
        onChange={(e) => onInputChange(e, id)}
      />
    )
  }

  renderVariants() {
    const {
      onInputChange,
      id,
      variants
    } = this.props

    const options = variants.reduce((res, variant) => {
      res.push({
        value: variant,
        title: variant
      })

      return res
    }, [])

    return (
      <RadioGroup
        name={id}
        options={options}
        onChange={(e) => onInputChange(e, id)}
      />
    )
  }

  render() {
    const { text, variants } = this.props

    return (
      <fieldset style={{ margin: '1em 0' }}>
        <legend>{text}</legend>

        {variants
          ? this.renderVariants()
          : this.renderText()}
      </fieldset>
    )
  }
}

export default Task
