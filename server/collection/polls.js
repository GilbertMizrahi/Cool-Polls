import PollsData from '/imports/api/polls.js';

Meteor.publish('polls', function (options) {
  return PollsData.find({}, options);
});

Meteor.publish('singlePoll', (id) => {
  check(id, String);
  return PollsData.find({_id: id});
});
