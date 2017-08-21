import React, { Component } from 'react'
import styles from './../../styles/components/Sidebar.css'

const Sidebar = (props) => (
  <div className={styles.sidebar}>
    {props.children}
  </div>
)

export default Sidebar
