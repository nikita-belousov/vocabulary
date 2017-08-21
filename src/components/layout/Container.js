import React, { Component } from 'react'
import styles from './../../styles/components/Container.css'

const Container = (props) => (
  <div className={styles.container}>
    {props.children}
  </div>
)

export default Container
