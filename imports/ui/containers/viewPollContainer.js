import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import  ViewPollHolder  from '../ViewPollHolder.jsx'
import PollsData from '/imports/api/polls.js';

export default ViewPollContainer = createContainer((props) => {
  console.log("props.id "+props.id)
  const handle = Meteor.subscribe('singlePoll', props.id)
  return {
    isLoggedIn: Meteor.user() !== null,
    isReady: handle.ready(),
    poll: PollsData.findOne(props.id),
    routeName: FlowRouter.current().route.name
  }

}, ViewPollHolder);
