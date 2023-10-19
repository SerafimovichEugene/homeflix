import React, { FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Stack } from 'react-bootstrap';
import { useVideos } from '../../../data/api/api';
import './styles.css';
import { HardDeleteModal } from './HardDeleteModal/HardDeleteModal';

interface VideoCardProps {
  id: string;
  name: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id, name }) => {
  const navigate = useNavigate();
  const { useHardDeleteVideo } = useVideos();
  const { mutate } = useHardDeleteVideo();

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

  const handleHardDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleShow();
  };

  const handleSubmit = () => {
    mutate(id);
    handleClose();
  };

  return (
    <>
      <Card className={'video-card card text-dark bg-light'} onClick={() => navigate(`/${id}`)}>
        <Card.Img variant="top" src={`/data/${id}-1.jpg`} alt="screenshot should be here" />
        <Card.Body>
          <Card.Text className="card-title">{name}</Card.Text>
          <Stack direction="horizontal" gap={3}>
            {/* <Button className="p-2 ms-auto" variant="outline-danger" size="sm" onClick={handleHardDelete}>
              Hard delete
            </Button> */}
          </Stack>
        </Card.Body>
      </Card>
      <HardDeleteModal isShow={isShow} handleClose={handleClose} handleSubmit={handleSubmit} />
    </>
  );
};
