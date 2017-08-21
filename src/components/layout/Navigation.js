import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/about">О сервисе</Link></li>
          <li><Link to="/lists">Списки</Link></li>
          <li><Link to="/test">Тесты</Link></li>
          <li><Link to="/translator">Словарь</Link></li>
        </ul>
      </div>
    )
  }
}

export default Navigation
