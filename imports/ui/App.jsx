import React, { Component, PropTypes } from 'react';
import Polls from "./Polls.jsx";

export default class App extends Component {
  render() {
    return (
      <div className="main-layout">
        <header>
          <h1>Polls</h1>
        </header>
        <Polls polls={this.props.polls} />
      </div>
    );
  }
}

App.propTypes = {
  polls: PropTypes.array.isRequired,
};
