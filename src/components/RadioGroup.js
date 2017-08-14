import React, { Component } from 'react';
import Radio from './Radio';

const RadioGroup = (props) => (
  <div>
    {props.options.map(option =>
      <Radio
        key={option.value}
        name={props.name}
        label={option.title}
        value={option.value}
        checked={option.value === props.value}
        onChange={props.onChange}
      />
    )}
  </div>
);

export default RadioGroup;
