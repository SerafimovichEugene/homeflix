import React from 'react';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="row">
        <h6>My id: {id}</h6>
      </div>
      <div className="row">
        <div className="col">
          <video controls>
            <source src={`http://localhost:8282/api/list/${id}`} type="video/mp4" />
          </video>
        </div>

      </div>

    </div>
  )
};

export default Video
