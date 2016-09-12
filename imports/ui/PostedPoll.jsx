import React, { Component, PropTypes } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import VoteOption from "./VoteOption.jsx";
import Option from "./Option.jsx";

export default class PostPoll extends TrackerReact(Component) {
  renderOptions() {
    if(this.hasVoted()){
      return (
        <div>
          <div className="panel-body">
            <Option options={this.props.poll.options}
              key={this.props.poll.options._id} maxVal={this.props.maxVal}/>
          </div>
          <div className="card-section poll-footer" >
              <span className="badge badge-info pull-right">{this.props.poll.totalVotes}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="panel-body">
          <VoteOption options={this.props.poll.options} key={this.props.poll.options._id}/>
        </div>
      )
    }
  }
  hasVoted() {
    const pollsTaken = Session.get("pollsTaken") || [];
    const id = FlowRouter.getParam('id');
    //using the grep function jQuery http://api.jquery.com/jQuery.grep/
    const result = $.grep(pollsTaken, function(e){ return e.pollId === id; });

    if (result.length == 0) {
      return false;
    } else if (result.length == 1) {
      return true;
    } else {
      // multiple items found for future user
      return true;
    }
  }
  render() {
    return (
      <div className=" poll ">
        <div className="question">
          <h3 className="">{this.props.poll.question}</h3>
        </div>
        <div className="panel-body">
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}
