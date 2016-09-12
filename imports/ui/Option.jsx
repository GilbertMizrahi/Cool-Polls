import React, {Component, PropTypes} from 'react';

export default class Option extends Component {
  perc(votes) {
    const totalVotes = this.props.totalVotes;
    let options = this.props.options;
    let maxValue = 0;
    options.forEach(function(el){
      if(el.votes > maxValue) maxValue = el.votes;
    })
    let perc = 0;
    if(maxValue > 0)
      perc = 100 * votes /maxValue;

    return perc + "%";
  }
  optionsSorted() {
    const options = _.sortBy(this.props.options, (option) => option.votes );
    return options.reverse();
  }
  renderOptions() {
    let options = this.optionsSorted();
    return options.map((option) => (
      <div className="option-item" key={option.index}>
        <div className="badge-holder" >
          <span className="badge badge-votes pull-right" >{option.votes}</span>
        </div>
        <div className="bar">
          <svg className="svg" width="100%" height="25">
            <rect className="rec-bgd" width="100%" height="100%"/>
            <rect className="rec" width={this.perc(option.votes)} height="100%"/>
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
