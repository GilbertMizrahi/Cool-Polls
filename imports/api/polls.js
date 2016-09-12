import {Mongo} from 'meteor/mongo';

const PollsData = new Mongo.Collection('polls');

const pollOptionsSchema = new SimpleSchema({
  id: {
    type: String
  },
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
    'polls.updatePoll'(id, pollAttributes) {
       PollsData.update(id, {
         $set: {
           question: pollAttributes.question,
           options: pollAttributes.options
         }
       });
       return id;
     },
     'polls.vote': function (pollId, id) {
        PollsData.update({
          _id: pollId,
          "options.id": id
        },{
          $inc: {totalVotes: 1, "options.$.votes":1 }
        }, function (error) {
          if(error)
            console.log("error "+error)
        }
      );
    },
    'polls.totalPolls'() {
      return PollsData.find({author: this.userId}).count();
    }
  })
}

export default PollsData;
