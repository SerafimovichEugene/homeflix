import React from 'react';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { id } = useParams();
  return (
    <div>
      <h6>My id: {id}</h6>
      <video controls width="250" >
        <source src={`http://localhost:8282/list/${id}`} type="video/mp4" />
      </video>
    </div>
  )
};

export default Video
