import React, {Component, PropTypes} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Polls from './Polls.jsx';
import PollsData from '/imports/api/polls.js';

const POLLS_PER_PAGE = 10;
const pageNumber = new ReactiveVar(1);
const totalPolls = new ReactiveVar(0);

export default class App extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {
      subscription: {
        pollsData: Meteor.subscribe('polls', {sort: {createdAt: -1}, limit: POLLS_PER_PAGE * pageNumber.get()})
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.pollsData.stop();
  }
  pollsData() {
    Meteor.subscribe('polls', {sort: {createdAt: -1}, limit: POLLS_PER_PAGE * pageNumber.get()})
    return PollsData.find({}, {sort: {createdAt: -1}, limit: POLLS_PER_PAGE * pageNumber.get()}).fetch();
  }
  increaseLimit(){
    if(POLLS_PER_PAGE * pageNumber.get() < totalPolls.get())
      pageNumber.set(pageNumber.get() + 1);
  }
  showMoreButton() {
    Meteor.call('totalPolls', function(error, result){
      totalPolls.set(result);
    })
    if(POLLS_PER_PAGE * pageNumber.get() < totalPolls.get())
      return (
        <div className="load-more">
          <button className="btn btn-more" onClick={this.increaseLimit} >Load More</button>
        </div>
      )
  }
  render() {
    return (
      <div className="">
        <Polls polls={this.pollsData()} />
        {this.showMoreButton()}
      </div>
    )
  }
}
