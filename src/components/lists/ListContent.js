import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Word
} from './../listsComponents'

let ListContent = class extends Component {
  render() {
    const { lists } = this.props
    const { listId } = this.props.match.params

    const activeList = lists.find(list => list.get('id') === listId)

    return activeList ?
      <div>
        <h2>{activeList.get('name')}</h2>

        {activeList.get('words').map(word => (
          <Word
            key={word.get('id')}
            listId={listId}
            id={word.get('id')}
            original={word.get('original')}
            translations={word.get('translations')}
            isLearnt={word.get('isLearnt')}
          />
        ))}
      </div>
      :
      null
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
