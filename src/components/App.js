import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Translator } from './translatorComponents'
import { ListManager } from './listsComponents'
import { TestManager } from './testComponents'

const App = () => (
    <Router>
      <div style={{
        width: '600px',
        margin: 'auto'
      }}>
        <ul>
          <li><Link to="/translator">Translator</Link></li>
          <li><Link to="/lists">My lists</Link></li>
          <li><Link to="/test">Test</Link></li>
        </ul>

        <Route path="/translator" component={Translator}/>
        <Route path="/lists" component={ListManager}/>
        <Route path="/test" component={TestManager}/>
      </div>
    </Router>
)

export default App
