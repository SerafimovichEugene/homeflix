import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoPlayer.scss';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    if (this.videoNode) {
      this.player = videojs(this.videoNode, this.props, () => {
        console.log('onPlayerReady', this);
      });
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video
          className="video-js"
          ref={(ref) => { this.videoNode = ref; }}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }
}
