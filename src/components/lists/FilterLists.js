import React, { Component } from 'react'
import styles from '../../styles/components/FilterLists.css'

import {
  TextInput
} from './../commonComponents'

class FilterLists extends Component {
  render() {
    const {
      name,
      onChange
    } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.label}>
          Filter lists
        </div>

        <TextInput
          appearance="tiny"
          name="name"
          value={name}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

export default FilterLists
