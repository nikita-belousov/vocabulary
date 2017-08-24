import React, { Component } from 'react'
import styles from '../../styles/components/Head.css'

const Head = (props) => {
  switch (props.level) {
    case '1':
      return <h1 className={styles['level-1']}>{props.children}</h1>
    case '2':
      return <h2 className={styles['level-2']}>{props.children}</h2>
    case '3':
      return <h3 className={styles['level-3']}>{props.children}</h3>
    case '4':
      return <h4 className={styles['level-4']}>{props.children}</h4>
    default:
      return <h4 className={styles['level-4']}>{props.children}</h4>
  }
}

export default Head
