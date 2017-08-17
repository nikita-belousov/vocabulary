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
  { value: 'byOne', title: 'by one task' },
  { value: 'all', title: 'all tasks' }
]

const TRANSLATE_MODES = [
  { value: 'fromOriginal', title: 'from original' },
  { value: 'toOriginal', title: 'to original' }
]

const REQUIRED_TRANSLATIONS = [
  { value: 'any', title: 'any' },
  { value: 'all', title: 'all' }
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

          {values.get('requiredTranslations')
            && <TestOption title="Required translations:">
                 <RadioGroup
                   name="requiredTranslations"
                   options={REQUIRED_TRANSLATIONS}
                   value={values.get('requiredTranslations')}
                   onChange={onChange}
                   disabled={values.get('variants')}
                 />
               </TestOption>}

          <TestOption>
            <Checkbox
              name="variants"
              checked={values.get('variants')}
              onChange={onChange}
              label="variants"
            />
          </TestOption>

          {/* <TestOption>
            <Checkbox
              name="involveLearnt"
              checked={values.get('involveLearnt')}
              onChange={onChange}
              label="learnt words"
            />
          </TestOption> */}

          <Button onClick={onSubmit}>
            Start test
          </Button>
      </fieldset>
    )
  }
}

export default TestOptions
