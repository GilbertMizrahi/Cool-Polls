import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
  render(){
    return (
      <div className="header">
        <nav className="flex-nav" >
          <div className="header-section" >
            <div className="nav-item header-logo" >
              <h1>Cool Polls</h1>
            </div>
            <div className="nav-item" >
              <a href="/" ><i className="fa fa-home"></i> Home</a>
            </div>
            <div className="nav-item" >
              <a href="/polls" ><i className="fa fa-list"></i> Polls</a>
            </div>
            <div className="nav-item" >
              <a href="/newPoll" ><i className="fa fa-plus-circle"></i> New Poll</a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
