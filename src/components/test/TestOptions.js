import React, { Component } from 'react'

import {
  RadioGroup,
  Checkbox,
  Button
} from './../commonComponents'

import {
  TestOption
} from './../testComponents'

const SHOW_MODES = [
  { value: 'byOne', title: 'by one word' },
  { value: 'all', title: 'all words' }
]

const TRANSLATE_MODES = [
  { value: 'fromOriginal', title: 'from original' },
  { value: 'toOriginal', title: 'to original' },
  { value: 'both', title: 'both' }
]

const TRANSLATIONS_REQUIRED = [
  { value: 'any', title: 'Any' },
  { value: 'all', title: 'All' }
]

class TestOptions extends Component {
  render() {
    const {
      title,
      onChange,
      values,
      onSubmit
    } = this.props

    return (
      <fieldset>
        <legend>{title}</legend>
        
          <TestOption title="Show mode:">
            <RadioGroup
              name="showMode"
              options={SHOW_MODES}
              value={values.get('showMode')}
              onChange={onChange}
            />
          </TestOption>

          <TestOption title="Translate mode:">
            <RadioGroup
              name="translateMode"
              options={TRANSLATE_MODES}
              value={values.get('translateMode')}
              onChange={onChange}
            />
          </TestOption>

          {values.get('translationsRequired')
            && (
            <TestOption title="Required translations:">
              <RadioGroup
                name="translationsRequired"
                options={TRANSLATIONS_REQUIRED}
                value={values.get('translationsRequired')}
                onChange={onChange}
              />
            </TestOption>
          )}

          <TestOption>
            <Checkbox
              name="variants"
              checked={values.get('variants')}
              onChange={onChange}
              label="with variants"
            />
          </TestOption>

          <Button onClick={onSubmit}>
            Start test
          </Button>
      </fieldset>
    )
  }
}

export default TestOptions
