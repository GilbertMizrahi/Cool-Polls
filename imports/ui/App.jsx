import React, { Component, PropTypes } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Polls from "./Polls.jsx";
import PollsData from '/imports/api/polls.js';

export default class App extends  TrackerReact(Component) {
  pollsData() {
    Meteor.subscribe('polls', {sort: {createdAt: -1}}); //add this when removing autopublish and insecure
    return PollsData.find().fetch();
  }
  render() {
    return (
      <div className="main-layout">
        <header>
          <h1>Polls</h1>
        </header>
        <Polls polls={this.pollsData()} />
      </div>
    );
  }
}

App.propTypes = {
  polls: PropTypes.array.isRequired,
};
