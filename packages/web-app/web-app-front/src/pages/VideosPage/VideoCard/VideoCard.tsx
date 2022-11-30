import React from "react";
import { Link } from "react-router-dom";

// @ts-ignore
import Placeholder from "../../../images/placeholder.png";

type VideoCardType = {
  link: string;
  name: string;
};

export const VideoCard = (props: VideoCardType) => {
  const { link, name } = props;
  return (
    <Link to={link} className="card">
      <img src={Placeholder} className="card-img-top" alt="img" />
      <div className="card-body">
        <p className="card-text ellipsis">{name}</p>
      </div>
    </Link>
  );
};
