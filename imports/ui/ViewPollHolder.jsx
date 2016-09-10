import React, { Component, PropTypes } from 'react';

import ViewPoll from "./ViewPoll.jsx";
import NewPoll from "./NewPoll.jsx";

export default class ViewPollHolder extends Component {
  isReady()  {
    console.log(this.props.isReady);
    if(this.props.isReady){
      console.log("this.props.routeName "+this.props.routeName)
      if(this.props.routeName === "viewPoll"){
        return (
          <ViewPoll poll={this.props.poll} route={this.props.routeName} />
        )
      } else {
        return (
          <NewPoll poll={this.props.poll} route={this.props.routeName}/>
        )
      }
    }
  }

  render() {
    return (
      <div>{this.isReady()}</div>
    );
  }
}
