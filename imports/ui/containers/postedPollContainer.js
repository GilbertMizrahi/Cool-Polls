import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import PostPollHolder  from '../PostPollHolder.jsx'
import PollsData from '/imports/api/polls.js';

export default PostedPollContainer = createContainer((props) => {
  const handle = Meteor.subscribe('singlePoll', props.id)
  return {
    isReady: handle.ready(),
    poll: PollsData.findOne(props.id),
    routeName: FlowRouter.current().route.name
  }

}, PostPollHolder);
