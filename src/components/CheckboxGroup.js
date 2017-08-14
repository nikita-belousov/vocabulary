import React, { Component } from 'react';
import Checkbox from './Checkbox';

const CheckboxGroup = (props) => (
  <div>
    {props.options.map(option =>
      <Checkbox
        key={option.value}
        name={props.name || ''}
        label={option.title || ''}
        value={option.value}
        checked={props.values.get(option.value)}
        onChange={props.onChange}
      />
    )}
  </div>
)

export default CheckboxGroup;
