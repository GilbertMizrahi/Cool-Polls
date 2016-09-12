import PollsData from '/imports/api/polls.js';

Meteor.publish('polls', function () {
  return PollsData.find();
});
