import React, { Component } from 'react'
import { fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'

import * as actions from './../../actions'

import {
  NeededListsInput,
  TestOptions
} from './../testComponents'

let CreateTestForm = class extends Component {
  state = {
    data: fromJS({
      neededLists: [],
      options: {
        showMode: 'byOne',
        translateMode: 'fromOriginal',
        variants: false,
        translationsRequired: 'any'
      }
    })
  }

  createTest = () => {
    const neededLists = this.state.data.get('neededLists')
    const options = this.state.data.get('options')

    this.props.dispatch(
      actions.createTest(neededLists, options)
    )
  }

  handleNeededListsChange = (checkedLists) => {
    this.setState(prevState => ({
      data: prevState.data.set(
        'neededLists',
        fromJS(checkedLists)
      )
    }))
  }

  handleOptionsChange = (e) => {
    const { name, value, checked } = e.target

    const setValue = name === 'variants' ?
      checked : value

    this.setState(prevState => {
      return {
        data: prevState.data.setIn(
          ['options', name],
          setValue
        )
      }
    })

    const translationsRequired = this.state.data
      .getIn(['options', 'translationsRequired'])
    let newRequired

    if ((name === 'translateMode')) {
      if (['fromOriginal', 'both'].includes(value)) {
        newRequired = 'any'
      } else {
        newRequired = null
      }

      this.setState(prevState => ({
        data: prevState.data.setIn(
          ['options', 'translationsRequired'],
          newRequired
        )
      }))
    }
  }


  renderForm() {
    const neededLists = this.state.data.get('neededLists')

    return (
      <div>
        <NeededListsInput
          title={'Select needed lists'}
          onChange={this.handleNeededListsChange}
        />

        {neededLists.size > 0 &&
          <TestOptions
            title={'Select options'}
            onChange={this.handleOptionsChange}
            values={this.state.data.get('options')}
            onSubmit={this.createTest}
          />
        }
      </div>
    )
  }

  renderNoLists() {
    return (
      <div>
        <p>First create some lists with words...</p>
      </div>
    )
  }

  isNoListsWithWords(lists) {
    for (let list of lists) {
      if (list.get('words').size > 0) return false
    }

    return true
  }

  render() {
    const { lists } = this.props

    return this.isNoListsWithWords(lists) ?
      this.renderNoLists() :
      this.renderForm()
  }
}

const mapStateToProps = (state) => ({
  state,
  lists: state.get('lists')
})

CreateTestForm = connect(
  mapStateToProps,
  null
)(CreateTestForm)

export default CreateTestForm
