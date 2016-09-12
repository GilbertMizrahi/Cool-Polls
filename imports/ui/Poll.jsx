import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Option from "./Option.jsx";

export default class Poll extends Component {
  formatDate(date) {
    return moment(date).fromNow();
  }
  render() {
    return (
      <div className="poll">
        <div className="question">
          <h3 className="">{this.props.poll.question}</h3>
            <span className="pull-right icons">
              <a href="#"><i className="fa fa-eye view-poll"></i></a>
              <a href="#"><i className="fa fa-pencil edit-poll"></i></a>
              <a href="#"><i className="fa fa-trash-o delete-poll" ></i></a>
            </span>
        </div>
        <div className="panel-body">
          <Option options={this.props.poll.options}
            key={this.props.poll.options.index}/>
          <div className="poll-footer">
            Created by {this.props.poll.author} <span
              className="badge badge-info pull-right">{this.props.poll.totalVotes}</span>
            <br/>
            {this.formatDate(this.props.poll.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

Poll.propTypes = {
  poll: PropTypes.object.isRequired,
};
