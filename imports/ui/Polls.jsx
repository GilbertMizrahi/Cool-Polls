import React, {Component, PropTypes} from 'react';
import Masonry from 'react-masonry-component';

import Poll from './Poll.jsx';

const masonryOptions = {
  transitionDuration: 0
}

export default class Polls extends Component {
  render() {
    const childElements = this.props.polls.map((poll) => {
      return <Poll poll={poll} key={poll._id} />
    })
    return (
      <div className="polls">
        <Masonry className="gallery" options={masonryOptions} disableImagesLoaded={false}>
          {childElements}
        </Masonry>
      </div>
    )
  }
}
