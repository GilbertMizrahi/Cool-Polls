import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false, toggle: false};
  }

  classes(path) {
    let menuClass = classNames(this.props.className, {
      'nav-item': true,
      'open': this.state.open,
      'active': ActiveRoute.path(path)
    });
    return menuClass;
  }

  logoutClasses() {
    let menuClass = classNames(this.props.className, {
      'dropdown-menu': true,
      'open': this.state.toggle,
    });
    return menuClass;
  }

  accountClasses(path) {
    let menuClass = classNames(this.props.className, {
      'nav-item': true,
      'account-item': true,
      'open': true,
      'active': ActiveRoute.path(path)
    });
    return menuClass;
  }

  showMenu(){
    if(this.state.open) this.setState({open:false});
    else this.setState({open:true});
  }

  closeMenu() {
    if(this.state.open) this.setState({open: false});
  }

  dropDownToggle(){
    if(this.state.toggle) this.setState({toggle: false});
    else this.setState({toggle: true});
  }

  logout(e) {
    e.preventDefault();
    this.dropDownToggle();
    Meteor.logout();
    FlowRouter.go('/');
  }

  isLoggedNav() {
    if(Meteor.user()) {
      return (
        <div className="header-section header-links" >
          <div className="nav-item toggle-nav" onClick={this.showMenu.bind(this)}>
            <a href="#" ><i className="fa fa-bars"></i> Menu</a>
          </div>
          <div className={this.classes("/")} onClick={this.closeMenu.bind(this)}>
            <a href="/" ><i className="fa fa-home"></i> Home</a>
          </div>
          <div className={this.classes("/polls")} onClick={this.closeMenu.bind(this)}>
            <a href="/polls" ><i className="fa fa-list"></i> Polls</a>
          </div>
          <div className={this.classes("/newPoll")} onClick={this.closeMenu.bind(this)}>
            <a href="/newPoll" ><i className="fa fa-plus-circle"></i> New Poll</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="header-section header-links" >
          <div className="nav-item toggle-nav" onClick={this.showMenu.bind(this)}>
            <a href="#" ><i className="fa fa-bars"></i> Menu</a>
          </div>
          <div className={this.classes("/")} onClick={this.closeMenu.bind(this)}>
            <a href="/" ><i className="fa fa-home"></i> Home</a>
          </div>
        </div>
      )
    }
  }

  loginNav(){
    if(Meteor.user()){
      return (
        <ul className="nav-login ">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" onClick={this.dropDownToggle.bind(this)}>
              <i className="fa fa-user"></i> {Meteor.user().username} <i className="fa fa-caret-down"></i>
            </a>
            <ul className={this.logoutClasses()} >
              <li><a href="#" onClick={this.logout.bind(this)}><i className="fa fa-lock"></i> Sign Out</a></li>
            </ul>
          </li>
        </ul>
      )
    } else {
      return (
        <div className="header-section header-login">
          <div className={this.accountClasses("/register")} onClick={this.closeMenu.bind(this)}><a href="/register"> Register</a></div>
          <div className={this.accountClasses("/login")} onClick={this.closeMenu.bind(this)}><a href="/login"> Login</a></div>
        </div>
      )
    }
  }

  render(){
    return (
      <div className="header">
        <nav className="flex-nav" >
          <div className="header-section" >
            <div className="nav-item header-logo" >
              <h1>Cool Polls</h1>
            </div>
          </div>
          {this.isLoggedNav()}
          {this.loginNav()}
        </nav>
      </div>
    )
  }
}
