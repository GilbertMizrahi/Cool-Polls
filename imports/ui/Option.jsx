import React, {Component, PropTypes} from 'react';

export default class Option extends Component {
  perc(votes) {
    let perc;
    if(this.props.maxVal == 0)
      perc = 0;
    else perc = 100*votes/this.props.maxVal;
    return perc + "%";
  }
  setWidthBadge(){
    const n = this.props.maxVal;
    let digits = n.toString().length;
    const width = 35 + digits*3; //25 + digits*8
    return {flexBasis: width+"px"}
  }

  optionsSorted() {
    const options = _.sortBy(this.props.options, (option) => option.votes );
    return options.reverse();
  }
  renderOptions() {
    let options = this.optionsSorted();
    return options.map((option) => (
      <div className="option-item" key={option.index}>
        <div style={this.setWidthBadge()} className="badge-holder" >
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
