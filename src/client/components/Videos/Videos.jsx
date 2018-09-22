import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Videos.scss';

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
    return (
      <div className="videos">
        <span>videos:</span>
        {
          videos.map(videoId => (
            <Link
              className="link"
              key={videoId}
              to={`/video/${videoId}`}
            >
              {videoId}
            </Link>
          ))
        }
      </div>
    );
  }
}

export default Videos;
