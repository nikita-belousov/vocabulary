import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { NavLink } from 'react-router-dom'
import styles from './../../styles/components/ListLabel.css'

import {
  ActionsMenu
} from './../commonComponents'

class ListLabel extends Component {
  state = {
    data: fromJS({
      isHovered: false
    })
  }

  countLearntWords(list) {
    return list.get('words')
      .filter(word => word.get('learningState') === 'learnt')
      .size
  }

  render() {
    const { list, listActions } = this.props
    const isHovered = this.state.data.get('isHovered')
    const learntWords = this.countLearntWords(list)

    return (
      <NavLink
        className={styles.link}
        to={`/list/${list.get('id')}`}
      >
        <div className={styles['list-label']}>
          <span className={styles['name']}>
            {list.get('name')}
          </span>

          <span className={styles['words-amount']}>
            {learntWords}/{list.get('words').size}
          </span>

          <ActionsMenu
            isHovered={isHovered}
            actions={listActions}
          />
        </div>
      </NavLink>
    )
  }
}

export default ListLabel
