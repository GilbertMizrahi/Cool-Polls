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
import ResetPassword from '../imports/ui/partials/resetPassword.jsx';

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
    if(Meteor.userId()) {
      mount(MainLayout, {
        header: (<Header />),
        content: (<App />)
      })
    } else {
      console.log("going home");
      FlowRouter.go('home');
    }
  }
});

FlowRouter.route('/newPoll', {
  name: 'newPoll',
  action() {
    if(Meteor.userId()) {
      mount(MainLayout, {
        header: (<Header />),
        content: (<NewPoll />)
      })
    } else FlowRouter.go('home');
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action(params) {
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

FlowRouter.route('/change-password', {
  name: 'change-password',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<ChangePassword />)
    })
  }
});

FlowRouter.route('/reset-password', {
  name: 'reset-password',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<ResetPassword />)
    })
  }
});
