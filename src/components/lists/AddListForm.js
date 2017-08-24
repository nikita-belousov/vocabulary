import React, { Component } from 'react'
import styles from '../../styles/components/AddListForm.css'

import {
  TextInput,
  Button
} from '../commonComponents'

class AddListForm extends Component {
  render() {
    const {
      onCancel,
      onAdd,
      onChange,
      name
    } = this.props

    return (
      <div className={styles.wrapper}>
        <TextInput
          name="name"
          placeholder="List name"
          value={name}
          onChange={onChange}
        />

        <Button onClick={onAdd}>
          Add list
        </Button>

        <Button
          type="link"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    )
  }
}

export default AddListForm
