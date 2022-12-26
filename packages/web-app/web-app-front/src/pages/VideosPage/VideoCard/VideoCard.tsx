import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Placeholder from "../../../images/placeholder.png";
import "./styles.css";

interface VideoCardProps {
  id: string;
  name: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id, name }) => {
  const navigate = useNavigate();
  return (
    <Card className={"video-card card text-dark bg-light"} onClick={() => navigate(`/${id}`)}>
      <Card.Img variant="top" src={Placeholder} />
      <Card.Body>
        <Card.Text className="card-title">{name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
