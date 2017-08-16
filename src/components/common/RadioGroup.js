import React, { Component } from 'react'
import { Radio } from './../commonComponents'

const RadioGroup = (props) => {
  const { options, value, ...restProps } = props

  return (
    <div>
      {options && options.map(option =>
        <Radio
          key={option.value}
          label={option.title}
          value={option.value}
          checked={option.value === props.value}
          {...restProps}
        />
      )}
    </div>
  )
}

export default RadioGroup
