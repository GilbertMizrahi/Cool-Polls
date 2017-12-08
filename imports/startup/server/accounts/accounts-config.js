import { Accounts } from 'meteor/std:accounts-ui';

Accounts.config({
    sendVerificationEmail: false,
    forbidClientAccountCreation: false,
    loginExpirationInDays: null,
});
