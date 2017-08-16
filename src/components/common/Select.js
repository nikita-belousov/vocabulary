import React, { Component } from 'react'

const Select = (props) => {
  const { options, ...restProps } = props

  return (
    <div>
      <select {...restProps}>
        {options && options.map(option =>
          <option
            key={option.value}
            value={option.value}
          >
            {option.name}
          </option>
        )}
      </select>
    </div>
  )
}

export default Select
