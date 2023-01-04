import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './styles.css';

interface VideoCardProps {
  id: string;
  name: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id, name }) => {
  const navigate = useNavigate();
  return (
    <Card className={'video-card card text-dark bg-light'} onClick={() => navigate(`/${id}`)}>
      <Card.Img variant="top" src={`/data/${id}-1.jpg`} alt="screenshot should be here" />
      <Card.Body>
        <Card.Text className="card-title">{name}</Card.Text>
      </Card.Body>
    </Card>
  );
};
