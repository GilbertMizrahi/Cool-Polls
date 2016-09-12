import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../imports/ui/layouts/mainLayout.jsx';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import NewPoll from '../imports/ui/NewPoll.jsx';

let polls = [
  {
    _id:1,
    question: 'What color do you like?',
    options: [
      {
        index: 1,
        option: 'black',
        votes: 5
      },
      {
        index: 2,
        option: 'white',
        votes: 7
      }
    ],
    totalVotes: 12,
    author: 'Gil',
    createdAt: new Date()
  },
  {_id:2, question: 'Where do you live?', options: [
    {
      index: 1,
      option: 'Boston',
      votes: 5
    },
    {
      index: 2,
      option: 'NY',
      votes: 10
    }
  ],
  totalVotes: 15,
  author: 'Peter',
  createdAt: new Date()
  },
];

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: (<Home />)
    })
  }
});

FlowRouter.route('/polls', {
  name: 'polls',
  action() {
    mount(MainLayout, {
      content: (<App polls={polls} />)
    })
  }
});

FlowRouter.route('/newPoll', {
  name: 'newPoll',
  action() {
    mount(MainLayout, {
      content: (<NewPoll />)
    })
  }
});
