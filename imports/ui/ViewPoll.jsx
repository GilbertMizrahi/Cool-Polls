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

  embedCode() {
      const n = this.props.poll.options.length;
      const height = (n + 1) * 40 + 50;
      const routeName = "pollPost";
      const protocol = window.location.protocol + "//";
      const host = window.location.hostname;
      let port = ":" + window.location.port;
      if(window.location.port == 80) port = "";
      const params = {
          id: this.props.poll._id
      };
      const path = protocol + host + port + FlowRouter.path(routeName, params);
      const embed = '<iframe width="100%" height="'
                    + height + '" src="' + path
                    +'" frameborder="0" ></iframe>';
      return embed;
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
        <div className="url">
          <div className=" instructions ">
            <div className="title">
              <h4 className="">Copy and Paste this code into your page to embed this poll</h4>
            </div>
            <div className="panel-body iframe-code">
              {this.embedCode()}
            </div>
          </div>
        </div>

      </div>
    )
  }
}
