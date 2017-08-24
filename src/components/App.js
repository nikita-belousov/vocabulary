import React, { Component } from 'react'
import { connect } from 'react-redux'

import './../styles/libs/font-awesome.css'
import './../styles/libs/normalize.css'
import './../styles/global.css'

import styles from './../styles/components/App.css'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {
  Container,
  Header,
  Sidebar,
  Content,
  Inner
} from './layoutComponents'

import {
  Translator
} from './translatorComponents'

import {
  ListsManager,
  ListContent
} from './listsComponents'

import {
  TestManager
} from './testComponents'


const App = () => (
  <Router>
    <div className={styles.app}>
      <Header />
      <Container>
        <Inner>
          <Sidebar>
            <ListsManager/>
          </Sidebar>
          <Content>
            <Route path="/list/:listId" component={ListContent} />
          </Content>
        </Inner>
      </Container>
    </div>
  </Router>
)

export default App
