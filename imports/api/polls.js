import { Mongo } from 'meteor/mongo';

const PollsData = new Mongo.Collection('polls');

Meteor.methods({
  insertPoll(data) {
      /*if(!this.userId)
  			throw new Meteor.Error('unauthorized');	*/
      PollsData.insert(data)
	},

	deletePoll(id) {
		/*if(!this.userId)
			throw new Meteor.Error('unauthorized')*/
		if(!id)
			throw new Meteor.Error('invalid id')

		PollsData.remove({
			_id:id
		})
	}
})

export default PollsData
