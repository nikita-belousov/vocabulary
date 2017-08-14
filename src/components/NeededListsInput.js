import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import CheckboxGroup from './CheckboxGroup';

let NeededListsInput = class extends Component {
  state = {
    data: fromJS({})
  }

  getCheckedListsArray() {
    const state = this.state.data;

    return state
      .keySeq()
      .toArray()
      .filter(key =>
        state.get(key)
      );
  }

  handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    this.setState(prevState => ({
      data: prevState.data.set(
        value,
        checked
      )
    }), () => {
      const checkedLists = this.getCheckedListsArray();
      this.props.onChange(checkedLists)
    });
  }

  getOnlyListsWithWords(allLists) {
    return allLists.filter(list =>
      list.get('words').size > 0
    );
  }

  listsToCheckboxOptions(lists) {
    return lists.reduce((res, list) => {
      const option = {
        title: list.get('name'),
        value: list.get('id')
      };

      res.push(option);
      return res;
    }, []);
  }

  render() {
    const { allLists, title } = this.props;
    const state = this.state.data;

    const filteredLists = this.getOnlyListsWithWords(allLists);
    const checkboxOptions = this.listsToCheckboxOptions(
      filteredLists
    );

    return (
      <fieldset>
        <legend>{title}</legend>

        <CheckboxGroup
          values={this.state.data}
          options={checkboxOptions}
          onChange={this.handleCheckboxChange}
        />
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  allLists: state.get('lists')
});

NeededListsInput = connect(
  mapStateToProps,
  null
)(NeededListsInput);

export default NeededListsInput;
