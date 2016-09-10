import React, { Component, PropTypes } from 'react';
import Poll from "./Poll.jsx";

export default class Polls extends Component {
  render() {
    return (
      <div className="polls">
          {this.props.polls.map((poll)=> {
            return <Poll poll={poll} key={poll._id}/>
          })}
      </div>
    );
  }
}

Polls.propTypes = {
  polls: PropTypes.array.isRequired,
};
