import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Polls from '../polls';

Meteor.publish('Polls.userPolls', function (listLimit) {
    return Polls.find(
        {
            author: this.userId,
        },
        {
            sort: { createdAt: -1 },
            limit: listLimit,
        },
    );
});

Meteor.publish('Polls.list', function (listLimit) {
    return Polls.find({}, {
        sort: { createdAt: -1 },
        limit: listLimit,
    });
});

Meteor.publish('Polls.poll', function (pollId) {
    check(pollId, String);

    return Polls.find({ _id: pollId });
});
