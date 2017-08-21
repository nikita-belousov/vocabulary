import React, { Component } from 'react'
import styles from './../../styles/components/Content.css'

const Content = (props) => (
  <div className={styles.content}>
    {props.children}
  </div>
)

export default Content
