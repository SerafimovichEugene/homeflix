import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Videos extends Component {
  static propTypes = {
    videos: PropTypes.array,
    getVideos: PropTypes.func,
  }

  componentDidMount() {
    const { getVideos } = this.props;
    getVideos();
  }

  render() {
    const { videos } = this.props;
    // console.log(videos);
    return (
      <div className="videos">
        <span>videos:</span>
        {/* {videos.map(video => <Link key={video.href} to={video.href}>{video.name}</Link>)} */}
      </div>
    );
  }
}

export default Videos;
