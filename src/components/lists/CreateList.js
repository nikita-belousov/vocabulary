import React, { Component } from 'react'

import * as api from './../../utils/dictionaryAPI'

import {
  Button,
  TextInput,
  Select,
  Textarea
} from './../commonComponents';

class CreateList extends Component {
  convertLangsToOptions(langs) {
    return langs.reduce((res, lang) => {
      res.push({
        value: lang.code,
        name: lang.name
      })

      return res
    }, [])
  }

  render() {
    const {
      isAdding,
      onCreate,
      onCancel,
      onFormChange,
      onConfirm
    } = this.props

    const langOptions = this.convertLangsToOptions(api.AVAIBLE_LANGS)

    return (
      <div>
        <Button onClick={isAdding ? onCancel : onCreate}>
          {isAdding ? 'Cancel' : 'Create new'}
        </Button>

        {isAdding &&
          <div>
            <TextInput
              onChange={onFormChange}
              name="name"
              type="text"
              placeholder="Name"
            />

            <Textarea
              onChange={onFormChange}
              name="description"
              cols="30" rows="5"
              placeholder="Description"
            />

            <Select
              name="lang"
              options={langOptions}
              onChange={onFormChange}
            />

            <Button onClick={onConfirm}>
              Confirm
            </Button>
          </div>}
      </div>
    )
  }
}

export default CreateList
