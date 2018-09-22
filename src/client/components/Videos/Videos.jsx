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
          videos.map(videoEntrie => (
            <Link
              className="link"
              key={videoEntrie[0]}
              to={`/video/${videoEntrie[0]}`}
            >
              {videoEntrie[1].fileName}
            </Link>
          ))
        }
      </div>
    );
  }
}

export default Videos;
