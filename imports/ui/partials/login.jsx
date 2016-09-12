import React, { Component, PropTypes } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class Login extends Component {
  render() {
    return (
      <div className="signin">
        <h2>Login</h2>
        <Accounts.ui.LoginForm formState={ STATES.SIGN_IN }/>
      </div>
    );
  }
}
