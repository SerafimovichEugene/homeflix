import React, { FC, useContext } from 'react';
import { Col, Container, Row, Ratio } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './index.css';
import { VideosPageContext, VideosPageContextInstance } from '../VideosPage/VidesPageContext/VideosPageContext';
import { FileEntity } from '../../domain';

const VideoPage: FC = () => {
  const { id } = useParams();
  const { files } = useContext<VideosPageContext>(VideosPageContextInstance);

  return (
    <Container className={'pt-2'}>
      <Row>
        <Col>
          <Ratio aspectRatio="16x9">
            <video controls className="video">
              <source src={`/api/videos/${id}`} type="video/mp4" />
            </video>
          </Ratio>
        </Col>
      </Row>
      {id && (
        <Row>
          <h6>{getVideoName(files, id)}</h6>
        </Row>
      )}
    </Container>
  );
};

export default VideoPage;

function getVideoName(videos: FileEntity[], id: string | undefined) {
  const videoEntity = videos.find((video) => video.id === id);
  if (videoEntity) {
    return videoEntity.name.split('.')[0]; // TODO replace with smart extension cutter. Name can contain a lot of dots.
  }
  return null;
}
