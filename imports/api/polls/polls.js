import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Polls = new Mongo.Collection('polls');

const optionsSchema = new SimpleSchema({
    id: {
        type: String,
    },
    index: {
        type: Number,
    },
    option: {
        type: String,
    },
    votes: {
        type: Number,
        defaultValue: 0,
    },
});

const pollsSchema = new SimpleSchema({
    question: {
        type: String,
    },
    options: {
        type: [optionsSchema],
    },
    author: {
        type: String,
        autoValue() {
            if (this.isInsert) {
                if (this.userId) {
                    return this.userId;
                } else if (!this.userId) {
                    const userIds = _.pluck(Meteor.users.find().fetch(), '_id');
                    return Random.choice(userIds);
                }
            }

            return this.unset();
        },
    },
    username: {
        type: String,
        autoValue() {
            if (this.isInsert) {
                if (this.userId) {
                    const user = Meteor.users.findOne(this.userId);
                    return user.username;
                } else if (!this.userId) {
                    const userIds = _.pluck(Meteor.users.find().fetch(), '_id');
                    const userId = Random.choice(userIds);
                    const user = Meteor.users.findOne(userId);
                    return user.username;
                }
            }

            return this.unset();
        },
    },
    createdAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            }

            return this.unset();
        },
    },
    totalVotes: {
        type: Number,
        defaultValue: 0,
    },
});

Polls.attachSchema(pollsSchema);

export default Polls;

Polls.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
});
