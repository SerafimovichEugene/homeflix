// import React from "react";
// import ReactDOM from "react-dom";
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import './video.scss';

// export default class VideoPlayer extends React.Component {
//   private player: any;
//   private videoNode: HTMLVideoElement;
//   componentDidMount() {
//     this.player = videojs(this.videoNode, this.props, () => {
//       console.log('onPlayerReady', this);
//     });
//   }

//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }

//   render() {
//     return (
//       <div data-vjs-player>
//         <video
//           className="video-js"
//           ref={(ref) => { this.videoNode = ref; }}
//         />
//       </div>
//     );
//   }
// }
