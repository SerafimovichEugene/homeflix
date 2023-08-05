import React, { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useVideos } from '../../../data/api/api';
import './styles.css';

interface VideoCardProps {
  id: string;
  name: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id, name }) => {
  const navigate = useNavigate();
  const { useHardDeleteVideo } = useVideos();
  const { mutate } = useHardDeleteVideo();

  const handleHardDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate(id);
  };

  return (
    <Card className={'video-card card text-dark bg-light'} onClick={() => navigate(`/${id}`)}>
      <Card.Img variant="top" src={`/data/${id}-1.jpg`} alt="screenshot should be here" />
      <Card.Body>
        <Card.Text className="card-title">{name}</Card.Text>
        <Card.Footer>
          <Button variant="secondary" size="sm" onClick={handleHardDelete}>
            hard delete
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
