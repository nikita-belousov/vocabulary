import React, { Component } from 'react'

class AddedToList extends Component {
  render() {
    const { listName } = this.props

    return (
      <p>
        Added to{' '}<b>{listName}</b>
      </p>
    )
  }
}

export default AddedToList
