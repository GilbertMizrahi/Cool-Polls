import { Meteor } from 'meteor/meteor';
import Polls from './polls';

Meteor.methods({
    'Polls.insert': (data) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('unauthorized', 'You are not logged in');
        }

        // Returns Poll._id
        return Polls.insert(data);
    },
    'Polls.delete': (pollId) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('unauthorized', 'You are not logged in');
        }

        if (!pollId) {
            throw new Meteor.Error('invalid id', 'You provided an invalid id');
        }

        Polls.remove(
            {
                _id: pollId,
            },
        );
    },
    'Polls.update': (pollId, data) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('unauthorized', 'You are not logged in');
        }

        if (!pollId) {
            throw new Meteor.Error('invalid id', 'You provided an invalid id');
        }

        if (!data) {
            throw new Meteor.Error('invalid data', 'You provided invalid data');
        }

        Polls.update({ _id: pollId }, {
            $set: {
                question: data.question,
                options: data.options,
            },
        });

        return pollId;
    },
    'Polls.vote': (pollId, optionId) => {
        if (!pollId) {
            throw new Meteor.Error('invalid id', 'You provided an invalid id');
        }

        if (!optionId) {
            throw new Meteor.Error('invalid option id', 'You provided an invalid option id');
        }

        Polls.update(
            {
                _id: pollId,
                'options.id': optionId,
            },
            {
                $inc: {
                    totalVotes: 1,
                    'options.$.votes': 1,
                },
            }, (error) => {
                if (error) {
                    console.log(error);
                }
            },
        );

        return pollId;
    },
    'Polls.count': () => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('unauthorized', 'You are not logged in');
        }

        return Polls.find({ author: Meteor.userId() }).count();
    },
});
