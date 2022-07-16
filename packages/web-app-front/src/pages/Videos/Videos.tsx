import React from 'react';
import { Link } from 'react-router-dom';

export const Videos = () => {
  const videos = [1,2,4,5];
  return (
    <div>
      <h4>here should be a list:</h4>
      {videos.map((v) => <div>
        <span>click: </span>
        <Link to={v.toString()}>{v}</Link>
      </div>)}
    </div>
  );
}

export default Videos;
