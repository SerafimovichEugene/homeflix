import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const Video = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="row">
        <h6>My id: {id}</h6>
      </div>
      <div className="row">
        <div className="col">
          <video controls className="video">
            <source src={`/api/videos/${id}`} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Video;
