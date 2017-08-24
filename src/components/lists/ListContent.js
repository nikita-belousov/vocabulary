import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import styles from '../../styles/components/ListContent.css'

import {
  Head,
  AddLink,
  TextInput,
  Button
} from './../commonComponents'

import {
  Word,
  AddWordToList
} from './../listsComponents'

let ListContent = class extends Component {
  render() {
    const { lists } = this.props
    const { listId } = this.props.match.params

    const activeList = lists.find(list => list.get('id') === listId)

    return activeList ? (
      <div>
        <Head level="2">
          {activeList.get('name')}
        </Head>

        {activeList.get('words').map(word => (
          <Word
            key={word.get('id')}
            listId={listId}
            id={word.get('id')}
            original={word.get('original')}
            translations={word.get('translations')}
            learningState={word.get('learningState')}
          />
        ))}

        <AddWordToList listId={listId} />
      </div>
    ) : null
  }
}

const mapStateToProps = (state) => ({
  lists: state.get('lists')
})

ListContent = connect(
  mapStateToProps,
  null
)(ListContent)

export default ListContent
