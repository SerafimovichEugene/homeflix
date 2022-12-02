import React, { FC } from "react";
import { Link } from "react-router-dom";
import Placeholder from "../../../images/placeholder.png";

interface VideoCardProps {
  link: string;
  name: string;
}

export const VideoCard: FC<VideoCardProps> = ({ link, name }) => (
  <Link to={link} className="card">
    <img src={Placeholder} className="card-img-top" alt="img" />
    <div className="card-body">
      <p className="card-text ellipsis">{name}</p>
    </div>
  </Link>
);
