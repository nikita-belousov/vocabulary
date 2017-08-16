import React, { Component } from 'react'

const Checkbox = (props) => (
  <div>
    <label>
      <input type="checkbox" {...props} />
      {props.label}
    </label>
  </div>
)

export default Checkbox
