import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {
  Header,
  Navigation,
  Footer
} from './../layoutComponents'

class PageLayout extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Navigation/>
        <Content/>

        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageLayout
