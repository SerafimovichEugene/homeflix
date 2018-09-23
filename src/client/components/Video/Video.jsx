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

  componentDidMount() {
    console.log('video did mount');
  }

  render() {
    const { id } = this.props.match.params;
    console.log(id);
    // const { videos } = this.props;
    // const path = videos[id].
    this.videoOptions.sources.src = `/api/video/${id}`;
    console.log(this.videoOptions.sources.src);
    return (
      <div>
        <span>{id}</span>
        <VideoPlayer {...this.videoOptions} />
      </div>
    );
  }
}
