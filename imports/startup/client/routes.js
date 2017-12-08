/* eslint-disable max-len */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from '../../ui/layouts/MainLayout';
import EmbedLayout from '../../ui/layouts/EmbedLayout';
import Header from '../../ui/components/Header';
import Footer from '../../ui/components/Footer';
import Register from '../../ui/components/Register';
import Login from '../../ui/components/Login';
import ChangePassword from '../../ui/components/ChangePassword';
import ResetPassword from '../../ui/components/ResetPassword';
import App from '../../ui/components/App';
import Home from '../../ui/components/Home';
import NewPoll from '../../ui/components/NewPoll';
import ViewPoll from '../../ui/components/ViewPoll';
import EditPoll from '../../ui/components/EditPoll';
import PollPost from '../../ui/components/PollPost';
import NotFound from '../../ui/pages/NotFound';

const authenticate = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};

/* const checkUser = (nextState, replace) => {
    if (Meteor.userId()) {
        replace({
            pathname: '/dashboard',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};*/

/* const signout = () => {
    Meteor.logout(() => {
        browserHistory.push('/');
    });
};*/

Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>
            {/* Private Routes */}
            <Route path="/" component={ MainLayout } /* onEnter={ checkUser } */ >
                <IndexRoute name="home" components={{ header: Header, content: Home, footer: Footer }} />
                <Route name="polls" path="/polls" components={{ header: Header, content: App, footer: Footer }} onEnter={ authenticate } />
                <Route name="newpoll" path="/newpoll" components={{ header: Header, content: NewPoll, footer: Footer }} onEnter={ authenticate } />
                <Route name="viewpoll" path="/viewpoll/:id" components={{ header: Header, content: ViewPoll, footer: Footer }} onEnter={ authenticate } />
                <Route name="editpoll" path="/editpoll/:id" components={{ header: Header, content: EditPoll, footer: Footer }} onEnter={ authenticate } />
                <Route name="login" path="/login" components={{ header: Header, content: Login, footer: Footer }} />
                <Route name="register" path="/register" components={{ header: Header, content: Register, footer: Footer }} />
                <Route name="change-password" path="/change-password" components={{ header: Header, content: ChangePassword, footer: Footer }} />
                <Route name="reset-password" path="/reset-password" components={{ header: Header, content: ResetPassword, footer: Footer }} />
            </Route>

            {/* Public Routes */}
            <Route path="/" component={ EmbedLayout } /* onEnter={ checkUser } */ >
                <Route name="pollpost" path="/pollpost/:id" components={{ content: PollPost, footer: Footer }} onEnter={ authenticate } />
            </Route>
            <Route path="*" component={ NotFound } />
        </Router>,
        document.getElementById('render-target'),
    );
});
