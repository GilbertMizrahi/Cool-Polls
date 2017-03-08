import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Factory } from 'meteor/dburles:factory';
import { Fake } from 'meteor/anti:fake';
import { Random } from 'meteor/random';
import Polls from '../../api/polls/polls';

if (!Meteor.isProduction) {
    Meteor.startup(() => {
        const nUsers = 10;
        const nPolls = 100;
        let totalVotes;

        if (Meteor.users.find().count() === 0) {
            for (let i = 0; i < nUsers; i += 1) {
                const user = Fake.user({
                    fields: [
                        'username',
                        'email',
                        'profile.name',
                    ],
                });

                user.password = '123456';
                Accounts.createUser(user);
            }
        }

        Factory.define('poll', Polls, {
            question: () => `${Fake.sentence()}?`,
            options: () => {
                const options = [];
                const nOptions = _.random(2, 8);
                totalVotes = 0;
                for (let i = 0; i < nOptions; i += 1) {
                    const max = _.random(4, 10);
                    const votes = _.random(0, max);
                    totalVotes += votes;
                    const option = {
                        id: i,
                        index: i,
                        option: Fake.sentence(2),
                        votes,
                    };

                    options.push(option);
                }

                return options;
            },
            author: () => {
                const userIds = _.pluck(Meteor.users.find().fetch(), '_id');
                const userId = Random.choice(userIds);
                return Meteor.users.findOne(userId).username;
            },
            createdAt: () => new Date() - (_.random(1, 15) * 1000 * 60 * 60 * 24),
            totalVotes: () => totalVotes,
        });

        if (Polls.find({}).count() === 0) {
            _(nPolls).times(() => {
                Factory.create('poll');
            });
        }
    });
}
