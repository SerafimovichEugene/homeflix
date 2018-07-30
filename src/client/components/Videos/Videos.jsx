import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Videos extends Component {
  static propTypes = {
    videos: PropTypes.array,
  }
  render() {
    const { videos } = this.props;
    return (
      <div className="videos">
        {videos.map(video => <Link key={video.href} to={video.href}>{video.name}</Link>)}
      </div>
    );
  }
}

export default Videos;
