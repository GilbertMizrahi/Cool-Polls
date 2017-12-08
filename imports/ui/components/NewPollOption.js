import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Options from '../../api/options/options';

class NewPollOption extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
        };

        this.onOptionChange = this.onOptionChange.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
    }

    onOptionChange() {
        const id = this.props.option._id;
        const option = this.refs.optionInput.value.trim();
        this.value = option;

        Options.update(id, { $set: { option } }, (error) => {
            if (error) {
                alert.error(error.reason);
            }
        });
    }

    deleteOption(event) {
        event.preventDefault();

        if (Options.find().count() > 2) {
            const id = this.props.option._id;
            Options.remove(id);
            this.props.updateParent(Math.floor(Math.random() * 1000) - 1);
        }
    }

    hideRemoveOption() {
        return Options.find().count() <= 2;
    }

    removeOptionClasses() {
        return classNames(this.props.className, {
            'remove-option': true,
            hidden: this.hideRemoveOption(),
        });
    }

    render() {
        return (
            <div className="input-option">
                <input
                    ref="optionInput"
                    type="text"
                    className="optionInput"
                    defaultValue={this.props.option.option}
                    placeholder="Enter option"
                    onChange={this.onOptionChange}
                    required
                />
                <a
                    href="#"
                    className={this.removeOptionClasses()}
                    onClick={this.deleteOption}
                >
                    <i className="fa fa-minus-square" />
                </a>
            </div>
        );
    }
}

NewPollOption.propTypes = {
    option: PropTypes.object.isRequired,
    updateParent: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default NewPollOption;
