import React from 'react';
import { useParams } from "react-router-dom";

const Video = () => {

  const { id } = useParams();

  return (
    <div>
      <h5>name, {id}</h5>
    </div>
  )
};

export default Video
