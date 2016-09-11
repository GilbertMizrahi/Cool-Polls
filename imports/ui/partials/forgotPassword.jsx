import React, {Component, PropTypes} from 'react';
import { Accounts, STATES} from 'meteor/std:accounts-ui';

export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="signin">
        <h2>Reset Password</h2>
        <Accounts.ui.LoginForm />
      </div>
    )
  }
}
