import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import Options from '../../api/options/options';
import PollsCollection from '../../api/polls/polls';
import NewPollOption from './NewPollOption';

const MAX_OPTIONS = 8;

class EditPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: 0,
            hidden: false,
        };

        Options.remove({});

        this.savePoll = this.savePoll.bind(this);
        this.addNewOption = this.addNewOption.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
    }

    getOptions() {
        const {
            poll,
        } = this.props;

        if (poll.options.length > 0 && Options.find().count() === 0) {
            poll.options.forEach(item => (
                Options.insert({ option: item.option, index: item.index })
            ));
        }

        return Options.find({}, {
            sort: {
                index: 1,
            },
        }).fetch();
    }

    addOption(option, index, event) {
        Options.insert({ option, index });
    }

    addNewOption(event) {
        event.preventDefault();

        if (Options.find().count() < MAX_OPTIONS) {
            const option = '';
            const index = Options.find().count();
            this.addOption(option, index);
            this.updateOptions();
        }
    }

    updateOptions() {
        this.setState({ options: Math.floor(Math.random() * 1000) - 1 });
    }

    savePoll(event) {
        event.preventDefault();

        const tempOptions = Options.find();
        const options = [];

        tempOptions.forEach((item, i) => {
            const option = {
                id: item._id,
                index: i,
                option: item.option,
                votes: 0,
            };

            options.push(option);
        });

        const poll = {
            question: this.refs.questionInput.value.trim(),
            options,
        };

        Meteor.call('Polls.update', this.props.poll._id, poll, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                Options.remove({});
                this.refs.questionInput.value = '';
                browserHistory.push(`/viewpoll/${result}`);
            }
        });
    }

    hideAddOption() {
        if (Options.find().count() >= MAX_OPTIONS) {
            Bert.alert('You have reached the maximum number of option for this poll', 'info', 'growl-top-right');
            return true;
        }

        return false;
    }

    addOptionClasses() {
        return classNames(this.props.className, {
            'add-option': true,
            hidden: this.hideAddOption(),
        });
    }

    render() {
        const {
            isReady,
            poll,
        } = this.props;

        if (isReady) {
            const options = this.getOptions().map(option => (
                <NewPollOption
                    option={option}
                    key={option._id}
                    updateParent={this.updateOptions}
                />
            ));

            return (
                <div>
                    <div>
                        <h1 className="new-poll-title">Edit Poll</h1>
                    </div>
                    <div className="new-poll">
                        <form className="form" onSubmit={this.savePoll} id="savePoll">
                            <div className="controls">
                                <input
                                    type="text"
                                    className="questionInput"
                                    ref="questionInput"
                                    placeholder="Enter your question"
                                    defaultValue={poll.question}
                                    required
                                />
                                {options}
                                <button
                                    className={this.addOptionClasses()}
                                    onClick={this.addNewOption}
                                >
                                    <i className="fa fa-plus-square"/>
                                </button>
                            </div>
                            <input type="submit" className="btn" value="Edit Poll"/>
                        </form>
                    </div>
                </div>
            );
        }

        return <div>Loading...</div>;
    }
}

EditPoll.propTypes = {
    options: PropTypes.array,
    isReady: PropTypes.bool,
    poll: PropTypes.object,
    className: PropTypes.string,
};

export default createContainer((props) => {
    const handle = Meteor.subscribe('Polls.poll', props.params.id);

    return {
        isLoggedIn: Meteor.user() !== null,
        isReady: handle.ready(),
        poll: PollsCollection.findOne(props.params.id),
    };
}, EditPoll);
