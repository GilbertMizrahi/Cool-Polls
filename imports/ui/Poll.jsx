import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import Option from './Option.jsx';

export default class Poll extends Component {
  deletePoll() {
    const currentPollId = this.props.poll._id;
    swal({
      title: "Are you sure you want to delete this poll?",
      text: "You will not be able to recover this if you do so",
      type: "warning",
      showCancelButton: true,
      ConfirmButtonColor: "#DD6B55",
      confrimButoonText: "Yes, delete it!",
      closeOnConfirm: true,
      html: false
    },
    function(isConfirm) {
      if(isConfirm){
        Meteor.call("deletePoll", currentPollId);
      }
    });
  }
  formatDate(date) {
    return moment(date).fromNow();
  }
  render() {
    return (
      <div className="poll">
        <div className="card-section" >
          <div className="question">
            <h3 className="">{this.props.poll.question}</h3>
            <span className="pull-right icons">
              <a href="#"><i className="fa fa-eye view-poll"></i></a>
              <a href="#"><i className="fa fa-pencil edit-poll"></i></a>
              <a href="#" onClick={this.deletePoll.bind(this)}><i className="fa fa-trash delete-poll"></i></a>
            </span>
          </div>
          <div className="panel-body">
              <Option options={this.props.poll.options} key={this.props.poll.options.index}/>
          </div>
        </div>
          <div className="card-section poll-footer">
            Created by {this.props.poll.author}
            <span className="badge badge-info pull-right">{this.props.poll.totalVotes}</span>
            <br/>
            {this.formatDate(this.props.poll.createdAt)}
          </div>
      </div>
    );
  }
}

Poll.propTypes = {
  poll: PropTypes.object.isRequired,
};
