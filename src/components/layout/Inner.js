import React, { Component } from 'react'
import styles from './../../styles/components/Inner.css'

const Inner = (props) => (
  <div className={styles.inner}>
    {props.children}
  </div>
)

export default Inner
