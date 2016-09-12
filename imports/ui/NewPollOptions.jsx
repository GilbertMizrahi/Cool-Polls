import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import OptionsData from '/imports/api/newPollOptions.js';

export default class NewPollOption extends Component {
  constructor(props) {
    super(props);
    this.state = {hidden: true};
  }

  removeOptionClasses() {
    let removeOptionClasses = classNames(this.props.className, {
        'remove-option': true,
        'hidden': this.hideRemoveOption()
      });
    return removeOptionClasses;
  }

  hideRemoveOption() {
    if(OptionsData.find().count() <= 2){
      return true;
    }
    return false;
  }


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

  deleteOption(e){
    e.preventDefault();
    const id = this.props.option._id;
    OptionsData.remove(id);
  }

  render() {

    return (
      <div className="input-option">
        <input type="text" className="optionInput" defaultValue={this.props.option.option}
          onChange={this.onOptionChange.bind(this)} placeholder="Enter option" required/>
        <a href="#" className={this.removeOptionClasses()} onClick={this.deleteOption.bind(this)}>
          <i className="fa fa-minus-square"></i>
        </a>
      </div>
    );
  }
}
