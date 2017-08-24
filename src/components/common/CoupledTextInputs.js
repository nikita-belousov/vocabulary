import React, { Component } from 'react'
import styles from '../../styles/components/CoupledTextInputs.css'

const CoupledTextInputs = (props) => (
  <div className={styles.coupled}>
    {props.children}
  </div>
)

export default CoupledTextInputs
