import React, { Component } from 'react';
import './root.scss';

export default class Root extends Component {
  render() {
    return (
      <div className="app">
        {/* <video controls>
          <source src="sp.mkv" type="video/mkv" />
          Your browser does not support the video tag.
        </video> */}
        <video controls preload='metadata'>
          <source src="nvz.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}
