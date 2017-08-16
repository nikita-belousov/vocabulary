import React, { Component } from 'react'
import { fromJS, toJS } from 'immutable'
import { connect } from 'react-redux'

import * as actions from './../../actions'
import * as api from './../../utils/dictionaryAPI'
import shortid from 'shortid'

import {
  Loading
} from './../commonComponents'

import {
  TranslationForm,
  TranslationResult,
  AddWordToList,
  AddedToList
} from './../translatorComponents'

let Translator = class extends Component {
  state = {
    data: fromJS({
      translationForm: {
        word: '',
        langFrom: 'en',
        langTo: 'ru'
      },
      isAdding: false,
      isAdded: false,
      addForm: {
        list: this.props.lists.get(0),
        checkedTranslations: []
      },
      result: null,
      isLoading: false
    })
  }

  onTranslationFormChange = (e) => {
    const { name, value } = e.target

    this.setState(({ data }) => ({
      data: data.setIn(['translationForm', name], value)
    }))
  }

  onAddFormChange = (e) => {
    const { value } = e.target

    this.setState(({data}) => ({
      data: data.setIn(
        ['addForm', 'list'],
        value
      )
    }))
  }

  prepareAdding = () => {
    this.setState(prevState => ({
      data: prevState.data.set('isAdding', true)
    }))
  }

  cancelAdding = () => {
    this.setState(prevState => ({
      data: prevState.data.set('isAdding', false)
    }))
  }

  isAddFormValid(addForm) {
    return (addForm.get('list') !== '') &&
      (addForm.get('checkedTranslations').size > 0)
  }

  tryAddWordToList = () => {
    const data = this.state.data

    if (this.isAddFormValid(data.get('addForm'))) {
      this.addWordToList(
        data.getIn(['addForm', 'list', 'id']),
        data.get('result'),
        data.getIn(['addForm', 'checkedTranslations'])
      )
    } else console.log('error adding word')
  }

  addWordToList(listId, result, checkedTranslations) {
    this.props.dispatch(actions.addWordToList(
      listId,
      fromJS({
        original: result.get('original'),
        translations: checkedTranslations
      })
    ))

    this.setState(({ data }) => ({
      data: data
        .set('isAdding', false)
        .set('isAdded', true)
    }))
  }

  swapLangs = () => {
    const { data } = this.state

    const from = data.getIn(['translationForm', 'langFrom'])
    const to = data.getIn(['translationForm', 'langTo'])

    this.setState(({ data }) => ({
      data: data
        .setIn(['translationForm', 'langFrom'], to)
        .setIn(['translationForm', 'langTo'], from)
    }))
  }

  onTranslationCheckboxChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      this.setState(({ data }) => ({
        data: data.updateIn(
          ['addForm', 'checkedTranslations'],
          list => list.push(value)
        )
      }))
    } else {
      this.setState(({ data }) => ({
        data: data.updateIn(
          ['addForm', 'checkedTranslations'],
          list => list.filter(item => item !== value)
        )
      }))
    }
  }

  translate = (word, from, to) => {
    this.setState(({ data }) => ({
      data: data
        .set('result', null)
        .set('isLoading', true)
    }))

    api.lookup(word, from, to)
      .then(res => this.setState(({ data }) => ({
        data: data
          .set('result', fromJS(res))
          .set('isLoading', false)
      })))
  }

  renderResult(result) {
    const { data } = this.state
    const avaibleLists = this.props.lists

    return (
      <div>
        <TranslationResult
          isAdding={data.get('isAdding')}
          result={result}
          onCheckboxChange={this.onTranslationCheckboxChange}
        />

        {data.get('isAdded')
          ? <AddedToList listName={data.getIn(['addForm', 'list', 'name'])} />
          : <AddWordToList
              isAdding={data.get('isAdding')}
              onAdd={this.prepareAdding}
              onCancel={this.cancelAdding}
              onConfirm={this.tryAddWordToList}
              listValue={data.getIn(['addForm', 'list', 'id'])}
              onChange={this.onAddFormChange}
              avaibleLists={avaibleLists.toJS()}
            />}
      </div>
    )
  }

  render() {
    const { data } = this.state

    let result = data.get('result')
    result = result && result.toJS()

    const isLoading = data.get('isLoading')

    return (
      <div>
        <TranslationForm
          onTranslate={this.translate}
          onChange={this.onTranslationFormChange}
          onSwap={this.swapLangs}
          word={data.getIn(['translationForm', 'word'])}
          langFrom={data.getIn(['translationForm', 'langFrom'])}
          langTo={data.getIn(['translationForm', 'langTo'])}
        />

        {result &&
          (result.poses ? this.renderResult(result) : 'Not found...')}

        {isLoading &&
          <Loading maxDots={3} interval={500} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  lists: state.get('lists')
})

Translator = connect(
  mapStateToProps,
  null
)(Translator)

export default Translator
