import React from 'react';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import './Video.scss';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoOptions = {
      autoplay: false,
      controls: true,
      sources: [{
        src: '/video',
        type: 'video/mp4',
      }],
    };
  }

  render() {
    const { id } = this.props.match.params;
    this.videoOptions.sources = [{ src: `/api/video/${id}`, type: 'video/mp4' }];
    return (
      <div>
        <span>{id}</span>
        <VideoPlayer {...this.videoOptions} />
      </div>
    );
  }
}
