import { Accounts } from 'meteor/std:accounts-ui';
import { browserHistory } from 'react-router';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    loginPath: '/login',
    signUpPath: 'register',
    resetPasswordPath: '/reset-password',
    changePasswordPath: 'forgot-password',
    profilePath: '/profile',
    onSignedInHook: () => browserHistory.push('/polls'),
    onSignedOutHook: () => browserHistory.push('/'),
    onPostSignUpHook: () => browserHistory.push('/newpoll'),
    minimumPasswordLength: 6,
});
