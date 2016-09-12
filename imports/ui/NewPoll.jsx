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
    };
    OptionsData.remove({});
  }

  componentWillUnmount() {
    this.state.subscription.optionsData.stop();
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
      Bert.alert( 'You have reached the maximum number of options for this poll',
        'info', 'growl-top-right' );

      return true;
    }
    return false;
  }

  buttonLabel() {
    if(this.props.route === "editPoll")
      return "Edit Poll";
    return "Create New Poll";
  }

  getOptions(){
    if(this.props.route === "editPoll" ){
      if(OptionsData.find().count() === 0) {
        const options = this.props.poll.options;
        options.forEach(function(item){
          OptionsData.insert({option: item.option, index:item.index });
        });
      }
    } else {
      if(OptionsData.find().count() < 2) {
        this.addOption("", 0);
        this.addOption("", 1);
      }
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
    const opts = OptionsData.find();
    let options = [];
    opts.forEach(function(item, i){
      let option = {
        index: i,
        option: item.option,
        id: item._id,
        votes: 0
      }
      options.push(option);
    })

    const poll = {
      question: this.refs.questionInput.value.trim(),
      options: options
    };
    if(this.props.route === "editPoll") {
      const id = Meteor.call("polls.updatePoll", this.props.poll._id, poll, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          FlowRouter.go("/viewPoll/"+result);
        }
      });
    } else {
      const id = Meteor.call("polls.insertPoll", poll, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log("id from insert " + result);
          OptionsData.remove({});
          FlowRouter.go("/viewPoll/"+result)
        }
      });
    }
  }

  getQuestion() {
    if(this.props.route === "editPoll")
      return this.props.poll.question;
    return "";
  }
  render() {
    const options = this.getOptions().map((option)=> {
      return <NewPollOption option={option} key={option._id}/>
    });

    return (
      <div>
        <div >
          <h1 className="new-poll-title">{this.buttonLabel()}</h1>
        </div>
        <div className="new-poll ">
          <form className="form" onSubmit={this.addNewPoll.bind(this)} id="addPoll">
            <div className="controls">
              <input className="questionInput"  ref="questionInput" type="text"
                defaultValue={this.getQuestion()}
                placeholder="Enter Your Question" required/>
              {options}
              <button className={this.addOptionClasses()} onClick={this.addNewOption.bind(this)}><i className="fa fa-plus-square"></i></button>
            </div>
            <input type="submit" className="btn" value={this.buttonLabel()} />
          </form>
        </div>
      </div>

    )
  }
}
