import React, { Component, PropTypes } from 'react';

import PostPoll from "./PostedPoll.jsx";

export default class PostPollHolder extends Component {
  isReady()  {
    if(this.props.isReady){
      return (
        <PostPoll poll={this.props.poll} route={this.props.routeName}/>
      )
    }
  }

  render() {
    return (
      <div>{this.isReady()}</div>
    );
  }
}
