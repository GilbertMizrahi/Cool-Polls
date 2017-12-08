import { Accounts, STATES } from 'meteor/std:accounts-ui';
import React, { Component } from 'react';

class ResetPassword extends Component {
    render() {
        return (
            <div className="signin">
                <h2>Reset Password</h2>
                <Accounts.ui.LoginForm formState={ STATES.PASSWORD_RESET } />
            </div>
        );
    }
}

export default ResetPassword;
