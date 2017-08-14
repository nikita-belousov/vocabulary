import React, { Component } from 'react';

const Radio = (props) => (
  <label>
    <input
      type="radio"
      name={props.name}
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
    />

    {props.label}
  </label>
);

export default Radio;
