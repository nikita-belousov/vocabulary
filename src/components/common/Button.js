import React, { Component } from 'react'
import styles from '../../styles/components/Button.css'

const Button = (props) => {
  const { type, ...restProps } = props

  let style
  if (!props.type)
    style = 'button-regular'
  else if (props.type === 'link')
    style = 'button-link'
  else if (props.type === 'add')
    style = 'button-add'

  return (
    <button
      className={styles[style]}
      {...restProps}
    >
      {props.children}
    </button>
  )
}

export default Button
