import React, { Component } from 'react';

const Checkbox = (props) => (
  <div>
    <label>
      <input
        type="checkbox"
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />

      {props.label}
    </label>
  </div>
);

export default Checkbox;
