import React, { Component } from 'react'
import * as api from './../../utils/dictionaryAPI'

import {
  Select,
  Button
} from './../commonComponents'

class LangsInput extends Component {
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
      valueFrom,
      valueTo,
      onChange,
      onSwap
    } = this.props

    const options = this.convertLangsToOptions(api.AVAIBLE_LANGS)

    return (
      <div>
        <Select
          name="langFrom"
          value={valueFrom}
          options={options}
          onChange={onChange}
        />

        <Select
          name="langTo"
          value={valueTo}
          options={options}
          onChange={onChange}
        />

        <Button onClick={onSwap}>
          Swap
        </Button>
      </div>
    )
  }
}

export default LangsInput
