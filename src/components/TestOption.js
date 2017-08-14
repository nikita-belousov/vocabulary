import React, { Component } from 'react';

const TestOption = (props) => (
  <div style={{
    margin: '1em 0'
  }}>
    <b>{props.title}</b>
    {props.children}
  </div>
);

export default TestOption;
