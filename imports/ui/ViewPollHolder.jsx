import React, { Component, PropTypes } from 'react';

import ViewPoll from "./ViewPoll.jsx";

export default class ViewPollHolder extends Component {
  isReady()  {
    console.log(this.props.isReady);
    if(this.props.isReady){
      console.log(this.props);
      return (
        <ViewPoll poll={this.props.poll} />
      )
    }
  }

  render() {
    return (
      <div>{this.isReady()}</div>
    );
  }
}
