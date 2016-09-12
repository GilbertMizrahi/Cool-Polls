import { Meteor } from 'meteor/meteor';

import PollsData from '/imports/api/polls.js';

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false,
  loginExpirationInDays: null
});

Meteor.startup(() => {
  // code to run on server at startup
  const nUsers = 10;
  if(Meteor.users.find().count() === 0){
    for(let i=0; i<nUsers; i++){
      let user = Fake.user({
        fields: [
          'username',
          'email',
          'profile.name'
        ]
      })
      user.password = 'password';

      id = Accounts.createUser(user);
    }
  }

  const nPolls = 100;
  let totalVotes;
  Factory.define('poll', PollsData, {
    question: function() {return Fake.sentence() + '?';},
    options: function() {
      let options = [];
      const nOptions = _.random(2,8);
      totalVotes = 0;
      for(let i=0; i<nOptions; i++){
        const max = _.random(4,10);
        const optionWords = Fake.sentence(2);
        const votes = _.random(0,max);
        totalVotes += votes;
        const option = {
          index: i,
          option: optionWords,
          votes: votes
        };
        options.push(option);
      }
      return options;
    },
    author: function() {
      const userIds = _.pluck(Meteor.users.find().fetch(), '_id');
      const userId = Random.choice(userIds);
      return Meteor.users.findOne(userId).username;
    },
    createdAt: function() {
      return new Date() - _.random(1,15)*1000*60*60*24;
    },
    totalVotes: function(){
      return totalVotes;
    }
  });

  if(PollsData.find({}).count() === 0) {
    _(nPolls).times(function(n){
      Factory.create('poll');
    })
  }
});
