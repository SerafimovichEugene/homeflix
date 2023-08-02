import React, { FC, useContext, useEffect } from 'react';
import { Col, Container, Row, Ratio } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './index.css';
import { VideosPageContext, VideosPageContextInstance } from '../VideosPage/VidesPageContext/VideosPageContext';
import { useVideos } from '../../data/api/api';
import { FileEntity } from '../../domain';

const VideoPage: FC = () => {
  const { id } = useParams();
  const { files, page, limit, setFiles } = useContext<VideosPageContext>(VideosPageContextInstance);
  const { useVideosList } = useVideos();
  const { data } = useVideosList({
    page,
    limit,
  });

  useEffect(() => {
    if (data) {
      setFiles(data.items);
    }
  }, [data]);

  const videoName = prepareVideoName(files, id);

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
      {videoName && (
        <Row>
          <h6>{videoName}</h6>
        </Row>
      )}
    </Container>
  );
};

export default VideoPage;

function prepareVideoName(videos: FileEntity[], id: string | undefined) {
  const videoEntity = videos.find((video) => video.id === id);
  if (videoEntity) {
    return videoEntity.name.split('.')[0];
  }
  return null;
}
