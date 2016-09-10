import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../imports/ui/layouts/mainLayout.jsx';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import NewPoll from '../imports/ui/NewPoll.jsx';
import Header from '../imports/ui/partials/header.jsx';

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
