import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link, browserHistory } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayResponsiveMenu: false,
            toggle: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.dropDownToggle = this.dropDownToggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    classes() {
        return classNames(this.props.className, {
            'nav-item': true,
            open: this.state.displayResponsiveMenu,
        });
    }

    logoutClasses() {
        return classNames(this.props.className, {
            'dropdown-menu': true,
            open: this.state.toggle,
        });
    }

    accountClasses() {
        return classNames(this.props.className, {
            'nav-item': true,
            'account-item': true,
            open: this.state.toggle,
        });
    }

    showMenu() {
        if (this.state.displayResponsiveMenu) {
            this.setState({ displayResponsiveMenu: false });
        } else {
            this.setState({ displayResponsiveMenu: true });
        }
    }

    closeMenu() {
        if (this.state.displayResponsiveMenu) {
            this.setState({ displayResponsiveMenu: false });
        }
    }

    isLoggedNav() {
        if (Meteor.user()) {
            return (
                <div className="header-section header-links">
                    <div className="nav-item toggle-nav" onClick={this.showMenu}>
                        <a href="#"><i className="fa fa-bars"></i>Menu</a>
                    </div>
                    <div className={this.classes()} onClick={this.closeMenu}>
                        <Link to="/"><i className="fa fa-home"></i>Home</Link>
                    </div>
                    <div className={this.classes()} onClick={this.closeMenu}>
                        <Link to="/polls"><i className="fa fa-list"></i>Polls</Link>
                    </div>
                    <div className={this.classes()} onClick={this.closeMenu}>
                        <Link to="/newpoll"><i className="fa fa-plus-circle"></i>New Poll</Link>
                    </div>
                </div>
            );
        }

        return (
            <div className="header-section header-links">
                <div className="nav-item toggle-nav" onClick={this.showMenu}>
                    <a href="#"><i className="fa fa-bars"></i>Menu</a>
                </div>
                <div className={this.classes()} onClick={this.closeMenu}>
                    <Link to="/"><i className="fa fa-home"></i>Home</Link>
                </div>
            </div>
        );
    }

    dropDownToggle() {
        if (this.state.toggle) {
            this.setState({ toggle: false });
        } else {
            this.setState({ toggle: true });
        }
    }

    logout(event) {
        event.preventDefault();
        this.dropDownToggle();
        Meteor.logout();
        this.setState({
            displayResponsiveMenu: false,
            toggle: false,
        });
        browserHistory.push('/');
    }

    loginNav() {
        if (Meteor.user()) {
            return (
                <ul className="nav-login">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" onClick={this.dropDownToggle}>
                            <i className="fa fa-user"></i>
                            {Meteor.user().username}
                            <i className="fa fa-caret-down"></i>
                        </a>
                    </li>
                    <ul className={this.logoutClasses()}>
                        <li>
                            <a href="#" onClick={this.logout}>
                                <i className="fa fa-lock"></i>
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </ul>
            );
        }

        return (
            <div className="header-section header-login">
                <div className={this.accountClasses()} onClick={this.closeMenu}>
                    <Link to="/register">Register</Link>
                </div>
                <div className={this.accountClasses()} onClick={this.closeMenu}>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="header">
                <nav className="flex-nav">
                    <div className="header-section">
                        <div className="nav-item header-logo">
                            <h1>Cool Polls</h1>
                        </div>
                    </div>
                    {this.isLoggedNav()}
                    {this.loginNav()}
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
