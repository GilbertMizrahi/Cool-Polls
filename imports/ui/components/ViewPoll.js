import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PollsCollection from '../../api/polls/polls';
import Clipboard from 'clipboard';

class ViewPoll extends Component {
    constructor(props) {
        super(props);

        const clipboard = new Clipboard('.btn-copy-link');
        clipboard.on('success', (event) => {
            Bert.alert('The iFrame was copied to the clipboard successfully!', 'info', 'growl-top-right');
            console.info('Action:', event.action);
            console.info('Text:', event.text);
            console.info('Trigger:', event.trigger);

            event.clearSelection();
        });
    }

    renderOptions() {
        const {
            options,
        } = this.props.poll;

        return options.map(option => (
            <div className="option-item" key={option.id}>
                <div className="bar view">
                    <svg className="svg" width="100%" height="25">
                        <rect
                            className="rec-bgd"
                            width="100%"
                            height="100%"
                        />
                    </svg>
                    <span className="option">&nbsp;{option.option}</span>
                </div>
            </div>
        ));
    }

    embedCode() {
        const {
            poll,
        } = this.props;

        const n = poll.options.length;
        const height = ((n + 1) * 45) + 80;
        const protocol = `${window.location.protocol}//`;
        const host = window.location.hostname;
        const port = window.location.port === '80' ? '' : `:${window.location.port}`;
        const path = `${protocol}${host}${port}/pollpost/${poll._id}`;

        return `<iframe width="100%" height="${height}" src="${path}" frameborder="0" />`;
    }

    isReady() {
        const {
            isReady,
            poll,
        } = this.props;

        if (isReady) {
            return (
                <div className="poll-view">
                    <div className="poll">
                        <div className="question">
                            <h3>{poll.question}</h3>
                        </div>
                        <div className="panel-body">
                            {this.renderOptions()}
                        </div>
                    </div>
                    <div className="url">
                        <div className="instructions">
                            <div className="title">
                                <h4>Copy and paste this code into your page to embed this poll</h4>
                            </div>
                            <div className="panel-body iframe-code">
                                {this.embedCode()}
                            </div>
                        </div>
                        <button
                            className="btn-copy-link"
                            data-clipboard-text={this.embedCode()}
                        >
                            Copy to clipboard
                        </button>
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

ViewPoll.propTypes = {
    options: PropTypes.array,
    isReady: PropTypes.bool,
    poll: PropTypes.object,
};

export default createContainer((props) => {
    const handle = Meteor.subscribe('Polls.poll', props.params.id);

    return {
        isLoggedIn: Meteor.user() !== null,
        isReady: handle.ready(),
        poll: PollsCollection.findOne(props.params.id),
    };
}, ViewPoll);
