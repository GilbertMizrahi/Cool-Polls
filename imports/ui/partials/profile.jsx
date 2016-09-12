import React, { Component, PropTypes } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class Profile extends Component {
  render() {
    return (
      <div className="signin">
        <h2>Profile</h2>
        <Accounts.ui.LoginForm formState={STATES.PROFILE}/>
      </div>
    )
  }
}
