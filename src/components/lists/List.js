import React, { Component } from 'react'
import { fromJS, toJS } from 'immutable'
import shortid from 'shortid'

import {
  Button
} from './../commonComponents'

import {
  Word,
  AddWords
} from './../listsComponents'

class List extends Component {
  state = {
    data: fromJS({
      isOpen: false
    })
  }

  toggleOpen = () => {
    this.setState(prevState => {
      return {
        data: prevState.data.set(
          'isOpen',
          !prevState.data.get('isOpen')
        )
      }
    })
  }

  countLearntWords(words) {
    return words.filter(word => word.isLearnt)
      .length
  }

  renderListContent(id, words) {
    return (
      <div>
        {this.renderWords(id, words)}
      </div>
    )
  }

  renderWords(listId, words) {
    return (
      <div>
        <br/>
        {words.map(word => (
          <Word
            key={shortid.generate()}
            listId={listId}
            id={word.id}
            original={word.original}
            translations={word.translations}
            isLearnt={word.isLearnt}
          />
        ))}
      </div>
    )
  }

  render() {
    const {
      id,
      name,
      description,
      lang,
      words
    } = this.props

    const isOpen = this.state.data.get('isOpen')

    const learntWords = this.countLearntWords(words)

    return (
      <div
        style={{
          cursor: isOpen ? 'default' : 'pointer',
          padding: '.8em',
          margin: '.6em',
          border: '1px solid black'
        }}
      >
        <div>
          <b>{name}</b>
          {' '}
          <i>
            {words.length > 0 ?
              `${learntWords}/${words.length}` :
              '(empty)'}
          </i>

          <AddWords listId={id}/>
          {words.length > 0 &&
            <Button onClick={this.toggleOpen}>
              {isOpen ? 'Close' : 'Open'}
            </Button>}
        </div>

        {isOpen && words.length > 0 &&
          this.renderListContent(id, words)}
      </div>
    )
  }
}

export default List
