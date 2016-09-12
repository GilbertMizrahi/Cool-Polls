import PollsData from '/imports/api/polls.js';

Meteor.publish('polls', function (options) {
  return PollsData.find({}, options);
});
