import React, {Component, PropTypes} from 'react';

import Poll from './Poll.jsx';

export default class Polls extends Component {
  maxVal(options) {
    let maxValue = 0;
    options.forEach(function(el){
      if(el.votes > maxValue) maxValue = el.votes;
    })
    return maxValue;
  }

  render() {
    const childElements = this.props.polls.map((poll) => {
      return <Poll poll={poll} key={poll._id} maxVal={this.maxVal(poll.options)}/>
    })
    return (
      <div className="polls">
          {childElements}
      </div>
    )
  }
}
