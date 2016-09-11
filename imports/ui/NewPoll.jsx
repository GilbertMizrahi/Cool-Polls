import React, {Component, PropTypes} from 'react';

import NewPollOption from './NewPollOptions.jsx'
import OptionsData from '/imports/api/newPollOptions.js';

export default class NewPoll extends Component {
  getOptions(){
    if(OptionsData.find().count() < 2) {
      this.addOption("", 0);
      this.addOption("", 1);
    }
    return OptionsData.find({}, {sort: {index: 1}}).fetch();
  }
  addOption(option, index, e){
    OptionsData.insert({option: option, index: index});
  }

  addNewPoll(e) {

  }
  render() {
    const options = this.getOptions().map((option)=> {
      return <NewPollOption option={option} key={option.index}/>
    });

    return (
      <div>
        <div >
          <h1 className="new-poll-title">Create New Poll</h1>
        </div>
        <div className="new-poll ">
          <form className="form" onSubmit={this.addNewPoll.bind(this)} id="addPoll">
            <div className="controls">
              <input className="questionInput"  ref="questionInput" type="text"
                placeholder="Enter Your Question" />
              {options}
              <button className="add-option "><i className="fa fa-plus-square"></i></button>
            </div>
            <input type="submit" className="btn" value="Create Poll"/>
          </form>
        </div>
      </div>

    )
  }
}
