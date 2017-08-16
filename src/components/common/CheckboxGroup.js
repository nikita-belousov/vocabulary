import React, { Component } from 'react'
import { Checkbox } from './../commonComponents'

const CheckboxGroup = (props) => {
  const { options, ...restProps } = props

  return (
    <div>
      {options.map(option =>
        <Checkbox
          key={option.value}
          label={option.title || undefined}
          value={option.value}
          checked={props.values.get(option.value)}
          {...restProps}
        />
      )}
    </div>
  )
}

export default CheckboxGroup
