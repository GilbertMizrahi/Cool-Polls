import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../imports/ui/layouts/mainLayout.jsx';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import NewPoll from '../imports/ui/NewPoll.jsx';
import Header from '../imports/ui/partials/header.jsx';
import NewUser from '../imports/ui/partials/register.jsx';
import Login from '../imports/ui/partials/login.jsx';
import ChangePassword from '../imports/ui/partials/changePassword.jsx';
import ForgotPassword from '../imports/ui/partials/forgotPassword.jsx';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<Home />)
    })
  }
});

FlowRouter.route('/polls', {
  name: 'polls',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<App />)
    })
  }
});

FlowRouter.route('/newPoll', {
  name: 'newPoll',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<NewPoll />)
    })
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<Login />)
    })
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<NewUser />)
    })
  }
});

FlowRouter.route('/reset-password', {
  name: 'reset-password',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<ChangePassword />)
    })
  }
});

FlowRouter.route('/forgot-password', {
  name: 'forgot-password',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<ForgotPassword />)
    })
  }
});
