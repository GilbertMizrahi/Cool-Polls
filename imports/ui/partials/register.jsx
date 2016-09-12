import React, { Component, PropTypes } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  loginPath: '/login',
  signUpPath: '/register',
  resetPasswordPath: '/reset-password',
  changePasswordPath: '/forgot-password',
  profilePath: '/profile',
  onSignedInHook: () => FlowRouter.go('/polls'),
  onSignedOutHook: () => FlowRouter.go('/'),
  onPostSignUpHook: () => FlowRouter.go('/newPoll'),
  minimumPasswordLength: 6
});

export default class NewUser extends Component {
  render() {
    return (
      <div className="signin">
        <h2>Register</h2>
        <Accounts.ui.LoginForm formState={ STATES.SIGN_UP }/>
      </div>
    );
  }
}
