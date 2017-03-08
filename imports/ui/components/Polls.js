import React, { Component, PropTypes } from 'react';
import Poll from './Poll';

class Polls extends Component {
    render() {
        const childElements = this.props.polls.map(poll => (
            <Poll poll={poll} key={poll._id} />
        ));

        return (
            <div className="polls">
                {childElements}
            </div>
        );
    }
}

Polls.propTypes = {
    polls: PropTypes.array,
};

export default Polls;
