import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import App from '../imports/ui/App.jsx';



Meteor.startup(function(){
  //render(<App polls={polls} />, document.getElementById('render-target'));
});
