import React, { Component, PropTypes } from 'react';

class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: 0,
        };

        this.optionsSorted = this.optionsSorted.bind(this);
    }

    perc(votes) {
        const {
            totalVotes,
        } = this.props;

        let perc = (100 * votes) / totalVotes;
        if (Number.isNaN(perc) || perc === undefined) {
            perc = 0;
        }

        return `${perc}%`;
    }

    setBadgeWidth() {
        const {
            options,
        } = this.props;

        // const maxValue = _.sortBy(options, option => option.votes)[options.length - 1].votes;
        const maxValue = Math.max(...options.map(option => option.votes));

        const digits = maxValue.toString().length;
        return { flexBasis: `${35 + (digits * 3)}px` };
    }

    optionsSorted() {
        const {
            options,
        } = this.props;

        return _.sortBy(options, option => option.votes).reverse();
    }

    renderOptions() {
        return this.optionsSorted().map((option) => {
            return (
                <div className="option-item" key={option.index}>
                    <div style={this.setBadgeWidth()} className="badge-holder">
                        <span className="badge badge-info pull-right">
                            {option.votes}
                        </span>
                    </div>
                    <div className="bar">
                        <svg className="svg" width="100%" height="25">
                            <rect
                                className="rec-bgd"
                                width="100%"
                                height="100%"
                            />
                            <rect
                                className="rec"
                                width={this.perc(option.votes)}
                                height="100%"
                            />
                        </svg>
                        <span className="option">&nbsp;{option.option}</span>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderOptions()}
            </div>
        );
    }
}

Options.propTypes = {
    options: PropTypes.array.isRequired,
    totalVotes: PropTypes.number.isRequired,
};

export default Options;
