import React, { Component, PropTypes } from 'react';

export default class ViewPoll extends Component {
  renderOptions() {
    let options = this.props.poll.options;
    console.log(options);
    return options.map((option) => (
      <div className="option-item" key={option.id}>
        <div className="bar view">
          <svg className="svg" width="100%" height="25">
            <rect className="rec-bgd view" width="100%" height="100%"  />
          </svg>
          <span className="option" >{option.option}</span>
        </div>
      </div>
    ))
  }
  render() {
    return (
      <div className="poll-view">
        <div className=" poll ">
          <div className="question">
            <h3 className="">{this.props.poll.question}</h3>
          </div>
          <div className="panel-body">
            {this.renderOptions()}
          </div>
        </div>

      </div>
    )
  }
}
