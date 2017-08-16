import React, { Component } from 'react'

const Radio = (props) => (
  <label>
    <input type="radio" {...props} />
    {props.label}
  </label>
)

export default Radio
