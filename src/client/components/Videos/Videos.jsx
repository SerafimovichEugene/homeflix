import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginator from './Paginator';
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
          videos.map(video => (
            <Link
              className="link"
              key={video.id}
              to={`/video/${video.id}`}
            >
              {video.fileName}
            </Link>
          ))
        }
        <div>
          <Paginator />
        </div>
      </div>
    );
  }
}

export default Videos;
