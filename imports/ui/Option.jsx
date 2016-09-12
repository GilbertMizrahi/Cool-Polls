import React, { Component, PropTypes } from 'react';

export default class Option extends Component {
  perc(votes) {
    //const totalVotes = this.props.totalVotes;
    let options = this.props.options;
    let maxValue = 0;
    options.forEach(function(el){
      if(el.votes > maxValue) maxValue = el.votes;
    })
    let perc = 100*votes/maxValue;
    if(perc == undefined) perc = 0;
    return perc + "%";
  }

   renderOptions() {
    let options = this.props.options;

    return options.map((option) => (
      <div className="option-item" key={option.index}>
        <span className="badge badge-votes pull-right " >{option.votes}</span>
        <div className="bar">
          <svg className="svg" width="100%" height="25">
           <rect className="rec-bgd" width="100%" height="100%"  />
           <rect className="rec"  width={this.perc(option.votes)} height="100%"  />
         </svg>
          <span className="option" > {option.option}</span>
        </div>
      	</div>
    ))
  }
  render() {
    return (
      <div>{this.renderOptions()}</div>

    );
  }
}

Option.propTypes = {
  options: PropTypes.array.isRequired,
};
