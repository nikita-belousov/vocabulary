import React, { Component } from 'react'

const Select = (props) => {
  const { options, placeholder, ...restProps } = props

  return (
    <div>
      <select
        defaultValue={!props.value && placeholder ? 'selectPlaceholder' : undefined}
        {...restProps}
      >
        {!props.value && placeholder &&
          <option
            key="selectPlaceholder"
            value="selectPlaceholder"
            disabled="true"
          >
            {placeholder}
          </option>}

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
