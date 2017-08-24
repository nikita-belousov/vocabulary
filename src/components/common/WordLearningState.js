import React, { Component } from 'react'
import styles from '../../styles/components/WordLearningState.css'

const WordLearningState = (props) => {
  let style
  if (props.state === 'notLearnt')
    style = 'not-learnt'
  if (props.state === 'halfLearnt')
    style = 'half-learnt'
  if (props.state === 'learnt')
    style = 'learnt'

  return <div className={styles[style]} />
}

export default WordLearningState
