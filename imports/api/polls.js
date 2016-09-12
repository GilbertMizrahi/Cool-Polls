import {Mongo} from 'meteor/mongo';

const PollsData = new Mongo.Collection('polls');

const pollOptionsSchema = new SimpleSchema({
  index: {
    type: Number
  },
  option: {
    type: String
  },
  votes: {
    type: Number,
    defaultValue: 0
  }
})

const pollsSchema = new SimpleSchema({
  question: {
    type: String
  },
  options: {
    type: [pollOptionsSchema]
  },
  author: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }  else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  username: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.user().username;
      }  else {
        this.unset();
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  totalVotes: {
    type: Number,
    defaultValue: 0
  }
});

PollsData.attachSchema(pollsSchema);

if(Meteor.isServer){
  Meteor.methods({
    'polls.insertPoll'(data) {
      if(!this.userId)
  			throw new Meteor.Error('unauthorized');

      const pollId = PollsData.insert(data);
      return pollId;
    },
    'polls.deletePoll'(id) {
      if(!this.userId)
			   throw new Meteor.Error('unauthorized')

      if(!id)
   			throw new Meteor.Error('invalid id')

      PollsData.remove({
        _id: id
      })
    },
    'polls.totalPolls'() {
      return PollsData.find().count();
    }
  })
}

export default PollsData;
