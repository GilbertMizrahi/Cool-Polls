import { Meteor } from 'meteor/meteor';
import 'meteor/kevohagan:sweetalert';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/pt-br';

import Options from './Options';

class Poll extends Component {
    constructor(props) {
        super(props);

        moment.locale('es'); // set to french but returns 'en'

        this.deletePoll = this.deletePoll.bind(this);
        this.allowEdit = this.allowEdit.bind(this);
        this.showIcons = this.showIcons.bind(this);
    }

    deletePoll() {
        const currentPollId = this.props.poll._id;

        sweetAlert(
            {
                title: 'Are you sure you want to delete this poll?',
                text: 'You will not be able to undo this',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false,
                html: false,
            },
            (isConfirm) => {
                if (isConfirm) {
                    Meteor.call('Polls.delete', currentPollId, (error) => {
                        if (error) {
                            sweetAlert('Error', error.reason, 'error');
                        } else {
                            sweetAlert('Deleted!', 'The poll has been deleted.', 'success');
                        }
                    });
                }
            },
        );
    }

    allowEdit() {
        const {
            poll,
        } = this.props;

        if (poll.totalVotes === 0) {
            return (
                <Link to={`editpoll/${poll._id}`}>
                    <i className="fa fa-pencil edit-poll" />
                </Link>
            );
        }

        return null;
    }

    showIcons() {
        const {
            poll,
        } = this.props;

        if (poll.author === Meteor.userId()) {
            return (
                <span className="pull-righ icons">
                    <Link to={`viewpoll/${poll._id}`}>
                        <i className="fa fa-eye view-poll" />
                    </Link>
                    {this.allowEdit()}
                    <a href="#" onClick={this.deletePoll} >
                        <i className="fa fa-trash delete-poll" />
                    </a>
                </span>
            );
        }

        return null;
    }

    render() {
        const {
            poll,
        } = this.props;

        return (
            <div className="poll">
                <div className="card-section">
                    <div className="question">
                        <h3>{poll.question}</h3>
                        {this.showIcons()}
                    </div>
                    <div className="panel-body">
                        <Options
                            options={poll.options}
                            totalVotes={poll.totalVotes}
                        />
                    </div>
                </div>
                <div className="card-section poll-footer">
                    Created by {poll.username}
                    <span
                        className="badge badge-info pull-right"
                    >
                        {poll.totalVotes}
                    </span>
                    <br />
                    Created {moment(poll.createdAt).locale('es').fromNow()}
                </div>
            </div>
        );
    }
}

Poll.propTypes = {
    poll: PropTypes.object.isRequired,
};

export default Poll;
