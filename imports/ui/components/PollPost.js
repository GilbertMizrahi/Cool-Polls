import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PollsCollection from '../../api/polls/polls';
import Options from './Options';

class PollPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: 0,
        };

        this.updateOptions = this.updateOptions.bind(this);
    }

    updateOptions() {
        this.setState({ options: Math.floor(Math.random() * 1000) - 1 });
    }

    hasVoted() {
        const {
            poll,
        } = this.props;

        const pollsTaken = Session.get('pollsTaken');

        if (!pollsTaken) {
            return false;
        }

        const result = $.grep(pollsTaken, event => (event.pollId === poll._id));

        return result.length !== 0;
    }

    vote(optionId) {
        const {
            poll,
        } = this.props;

        Meteor.call('Polls.vote', poll._id, optionId, (error) => {
            if (error) {
                console.log(error);
            } else {
                const pollsTaken = Session.get('pollsTaken') || [];
                const votedOn = { pollId: poll._id};
                pollsTaken.push(votedOn);
                Session.setPersistent('pollsTaken', pollsTaken);
                this.updateOptions();
            }
        });
    }

    renderOptions() {
        const {
            poll,
        } = this.props;

        if (this.hasVoted()) {
            return (
                <div>
                    <Options
                        options={poll.options}
                        totalVotes={poll.totalVotes}
                    />
                    <div className="card-section poll-footer">
                        Total Votes
                        <span className="badge badge-info pull-right">
                            {poll.totalVotes}
                        </span>
                    </div>
                </div>
            );
        }

        return (
            poll.options.map(option => (
                <div
                    className="option-item"
                    key={option.id}
                    onClick={this.vote.bind(this, option.id)}
                >
                    <div className="bar view">
                        <svg className="svg vote" width="100%" height="30">
                            <rect
                                className="rec-bgd view"
                                width="100%"
                                height="100%"
                            />
                        </svg>
                        <span className="option posted">{option.option}</span>
                    </div>
                </div>
            ))
        );
    }

    isReady() {
        const {
            isReady,
            poll,
        } = this.props;

        if (isReady) {
            return (
                <div className="poll">
                    <div className="question">
                        <h3>{poll.question}</h3>
                    </div>
                    <div className="panel-body">
                        {this.renderOptions()}
                    </div>
                </div>
            );
        }

        return <div>Loading...</div>;
    }

    render() {
        return (
            <div>{this.isReady()}</div>
        );
    }
}

PollPost.propTypes = {
    isReady: PropTypes.bool,
    poll: PropTypes.object,
};

export default createContainer((props) => {
    const handle = Meteor.subscribe('Polls.poll', props.params.id);

    return {
        isReady: handle.ready(),
        poll: PollsCollection.findOne(props.params.id),
    };
}, PollPost);
