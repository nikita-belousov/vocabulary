import React, { Component } from 'react'
import styles from '../../styles/components/TextInput.css'

const TextInput = (props) => {
  const { appearance, ...restProps } = props

  let style
  if (!appearance)
    style = 'regular'
  else if (appearance === 'tiny')
    style = 'tiny'

  return (
    <input
      className={styles[style]}
      type="text"
      {...restProps}
    />
  )
}

export default TextInput
