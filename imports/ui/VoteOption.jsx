import React, { Component, PropTypes } from 'react';

export default class VoteOption extends Component {
  vote(option){
    const pollId = FlowRouter.getParam('id');
    const optionId = option.id;

    Meteor.call("polls.vote", pollId, optionId, function(error,result){
      if(error){

      } else {
        const pollsTaken = Session.get("pollsTaken") || [];
        const votedOn = {pollId: pollId};
        pollsTaken.push(votedOn);
        Session.setPersistent("pollsTaken", pollsTaken);
      }
    })

  }
  renderOptions() {
    let options = this.props.options;
    return options.map((option) => (
        <div className="option-item " key={option.id}
          onClick={this.vote.bind(this, option)}>
          <div className="bar view">
            <svg className="svg vote"  width="100%" height="30">
              <rect className="rec-bgd view" width="100%" height="100%"  />
            </svg>
            <span className="option posted" >{option.option}</span>
          </div>
        </div>
      ))
  }
  render() {
    return (
      <div>{this.renderOptions()}</div>
    )
  }
}

Option.propTypes = {
  options: PropTypes.array.isRequired,
};
