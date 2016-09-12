import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../imports/ui/layouts/mainLayout.jsx';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import NewPoll from '../imports/ui/NewPoll.jsx';
import Header from '../imports/ui/partials/header.jsx';
import Footer from '../imports/ui/partials/footer.jsx';
import NewUser from '../imports/ui/partials/register.jsx';
import Login from '../imports/ui/partials/login.jsx';
import ChangePassword from '../imports/ui/partials/changePassword.jsx';
import ResetPassword from '../imports/ui/partials/resetPassword.jsx';
import ViewPollContainer from '../imports/ui/containers/viewPollContainer.js';
import EditPollContainer from '../imports/ui/containers/editPollContainer.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      header: (<Header />),
      content: (<Home />),
      footer: (<Footer />)
    })
  }
});

FlowRouter.route('/polls', {
  name: 'polls',
  action() {
    if(Meteor.userId()) {
      mount(MainLayout, {
        header: (<Header />),
        content: (<App />),
        footer: (<Footer />)
      })
    } else FlowRouter.go('home');
  }
});

FlowRouter.route('/newPoll', {
  name: 'newPoll',
  action() {
    if(Meteor.userId()) {
      mount(MainLayout, {
        header: (<Header />),
        content: (<NewPoll />),
        footer: (<Footer />)
      })
    } else FlowRouter.go('home');
  }
});

FlowRouter.route('/viewPoll/:id', {
  name: 'viewPoll',
  action(id) {
    mount(MainLayout, {
      header: (<Header  />),
      content: (<ViewPollContainer {...id} />)
    })
  }
});

FlowRouter.route('/editPoll/:id', {
  name: 'editPoll',
  action(id) {
    mount(MainLayout, {
      header: (<Header  />),
      content: (<EditPollContainer {...id} />)
    })
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
