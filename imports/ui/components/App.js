import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PollsCollection from '../../api/polls/polls';
import Polls from './Polls';

const PER_PAGE = 3;
const listLimit = new ReactiveVar(PER_PAGE);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMoreButton: true,
        };

        this.increaseLimit = this.increaseLimit.bind(this);
    }

    increaseLimit() {
        if (PollsCollection.find().count() >= listLimit.get()) {
            listLimit.set(listLimit.get() + PER_PAGE);
        }
    }

    showMoreButton() {
        Meteor.call('Polls.count', (error, pollsCount) => {
            if (error) {
                console.log(error);
            } else if (this.state.showMoreButton && (pollsCount < listLimit.get())) {
                this.setState({ showMoreButton: false });
            }
        });

        if (this.state.showMoreButton) {
            return (
                <button
                    className="btn btn-more"
                    onClick={this.increaseLimit}
                >
                    Load More...
                </button>
            );
        }

        return null;
    }

    render() {
        const {
            polls,
            ready,
        } = this.props;

        if (!ready) {
            return <div>Loading...</div>;
        }

        return (
            <div className="main-layout">
                <header>
                    <h1>Polls</h1>
                </header>
                <Polls polls={polls} />
                <div className="load-more">
                    {this.showMoreButton()}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    polls: PropTypes.array,
    ready: PropTypes.bool,
};

export default createContainer(() => {
    const pollsHandler = Meteor.subscribe('Polls.userPolls', listLimit.get());

    let polls = null;
    if (pollsHandler.ready()) {
        polls = PollsCollection.find().fetch();
    }

    return {
        polls,
        ready: polls !== null,
    };
}, App);
