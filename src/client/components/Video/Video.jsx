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
        src: '',
        type: 'video/mp4',
      }],
    };
  }

  // componentDidMount() {
  //   console.log('video did mount');
  // }

  render() {
    const { id } = this.props.match.params;
    console.log(id);
    this.videoOptions.sources.src = currentPath;
    return (
      <div>
        <VideoPlayer {...this.videoOptions} />
      </div>
    );
  }
}
