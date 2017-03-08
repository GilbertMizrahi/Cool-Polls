import { Accounts, STATES } from 'meteor/std:accounts-ui';
import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="signin">
                <h2>Login</h2>
                <Accounts.ui.LoginForm />
            </div>
        );
    }
}

export default Login;
