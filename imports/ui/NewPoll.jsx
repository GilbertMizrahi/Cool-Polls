import React, {Component, PropTypes} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import classNames from 'classnames';

import NewPollOption from './NewPollOptions.jsx'
import OptionsData from '/imports/api/newPollOptions.js';

const MAX_OPTIONS = 8;

export default class NewPoll extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        optionsData: Meteor.subscribe(null)
      },
      hidden: false
    }
  }

  addOptionClasses() {
    let addOptionClasses = classNames(this.props.className, {
        'add-option': true,
        'hidden': this.hideAddOption()
      });
    console.log("addOptionClasses "+addOptionClasses)
    return addOptionClasses;
  }

  hideAddOption() {
    if(OptionsData.find().count() >= MAX_OPTIONS){
      return true;
    }
    return false;
  }


  getOptions(){
    if(OptionsData.find().count() < 2) {
      this.addOption("", 0);
      this.addOption("", 1);
    }
    return OptionsData.find({}, {sort: {index: 1}}).fetch();
  }
  addOption(option, index, e){
    OptionsData.insert({option: option, index: index});
  }

  addNewOption(e){
    e.preventDefault();
    const option = "";
    const index = OptionsData.find().count();
    this.addOption(option, index);
    console.log(OptionsData.find({}, {sort: {index: 1}}).fetch())
  }

  addNewPoll(e) {
    e.preventDefault();
    const poll = {
      question: this.refs.questionInput.value.trim(),
      options: ""//options
    };
    const id = Meteor.call("polls.insertPoll", poll, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log("id from insert " + result);
        console.log()
      }
    });
  }
  render() {
    const options = this.getOptions().map((option)=> {
      return <NewPollOption option={option} key={option._id}/>
    });

    return (
      <div>
        <div >
          <h1 className="new-poll-title">Create New Poll</h1>
        </div>
        <div className="new-poll ">
          <form className="form" onSubmit={this.addNewPoll.bind(this)} id="addPoll">
            <div className="controls">
              <input className="questionInput"  ref="questionInput" type="text"
                placeholder="Enter Your Question" />
              {options}
              <button className={this.addOptionClasses()} onClick={this.addNewOption.bind(this)}><i className="fa fa-plus-square"></i></button>
            </div>
            <input type="submit" className="btn" value="Create Poll"/>
          </form>
        </div>
      </div>

    )
  }
}
