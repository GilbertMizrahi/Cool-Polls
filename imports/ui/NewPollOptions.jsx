import React, { Component, PropTypes } from 'react';

import OptionsData from '/imports/api/newPollOptions.js';

export default class NewPollOption extends Component {

  onOptionChange(event) {
    let id = this.props.option._id;
    console.log("ref "+this.props.option.index+" id "+id);
    let option = event.target.value;
    this.value = option;
    OptionsData.update(id, {$set: {option: option}}, function(error, result) {
      console.log(OptionsData.find({}, {sort: {index: 1}}).fetch())
      if (error) {
        // display the error to the user
        alert.error(error.reason);
      }
    });
  }
render() {

    return (
      <div className="input-option">
        <input type="text" className="optionInput" defaultValue={this.props.option.option}
          onChange={this.onOptionChange.bind(this)} placeholder="Enter option" />
        <a href="#" className="remove-option "><i className="fa fa-minus-square"></i></a>
      </div>
    );
  }
}
