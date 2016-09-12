import React, {Component, PropTypes} from 'react';

import Poll from './Poll.jsx';

export default class Polls extends Component {
  render() {
    const childElements = this.props.polls.map((poll)=> {
      return <Poll poll={poll} key={poll._id} />
    });
    return (
      <div className="polls">
          {childElements}
      </div>
    );
  }
}
