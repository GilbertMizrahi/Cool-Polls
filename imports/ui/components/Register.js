import { Accounts, STATES } from 'meteor/std:accounts-ui';
import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="signin">
                <h2>Register</h2>
                <Accounts.ui.LoginForm formState={ STATES.SIGN_UP } />
            </div>
        );
    }
}

export default Register;
