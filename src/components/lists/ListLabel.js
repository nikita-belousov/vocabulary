import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './../../styles/components/ListLabel.css'

class ListLabel extends Component {
  countLearntWords(list) {
    return list.get('words')
      .filter(word => word.get('isLearnt'))
      .size
  }

  render() {
    const { list } = this.props

    const learntWords = this.countLearntWords(list)

    return (
      <NavLink
        to={`/list/${list.get('id')}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        activeStyle={{ fontWeight: 'bold' }}
      >
        <div className={styles['list-label']}>
          <span className={styles['name']}>
            {list.get('name')}
          </span>

          <span className={styles['words-amount']}>
            {learntWords}/{list.get('words').size}
          </span>

          <i className={styles['settings-button']} />
        </div>
      </NavLink>
    )
  }
}

export default ListLabel
