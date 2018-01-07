import React, { Component } from 'react';
import VideoPlayer from '../video/video';
import './root.scss';

export default class Root extends Component {
  constructor() {
    super();
    this.videoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [{
        src: '/video',
        type: 'video/mp4',
      }],
    };
  }

  render() {
    return (
      <div className="app">
        <VideoPlayer {...this.videoJsOptions} />
      </div>
    );
  }
}
