import React, { Component, PropTypes } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import VoteOption from "./VoteOption.jsx";

export default class PostPoll extends TrackerReact(Component) {
  renderOptions() {
    if(this.hasVoted()){
      return (
        <div>

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
    return false;
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
