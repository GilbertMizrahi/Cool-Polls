import React, { Component, PropTypes } from 'react';

import PostPoll from "./PostedPoll.jsx";

export default class PostPollHolder extends Component {
  isReady()  {
    if(this.props.isReady){
      return (
        <PostPoll poll={this.props.poll} route={this.props.routeName}
          maxVal={this.maxVal()}/>
      )
    }
  }

  maxVal() {
    let maxValue = 0;
    this.props.poll.options.forEach(function(el){
      if(el.votes > maxValue) maxValue = el.votes;
    })
    return maxValue;
  }

  render() {
    return (
      <div>{this.isReady()}</div>
    );
  }
}
