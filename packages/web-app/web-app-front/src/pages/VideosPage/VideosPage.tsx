import React, { FC, useContext, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { VideoCard } from './VideoCard/VideoCard';
import { FileEntity } from '../../domain';
import { CustomSpinner } from '../../components/Spinner/Spinner';
import { Paginator } from '../../components/Paginator/Paginator';
import { useVideos } from '../../data/api/api';
import { Search } from './Search/Search';
import { VideosPageContext, VideosPageContextInstance } from './VidesPageContext/VideosPageContext';
import './styles.css';

const VideosPage: FC = () => {
  const { page, setPage, limit, search, setSearch, files, setFiles } =
    useContext<VideosPageContext>(VideosPageContextInstance);

  const { useVideosList } = useVideos();

  const { data, isLoading, refetch } = useVideosList({
    page,
    limit,
    search,
  });

  const changePage = (pageNumber: number): void => {
    setPage(pageNumber);
  };

  useEffect(() => {
    refetch().then();
  }, [page, limit]);

  useEffect(() => {
    if (data) {
      setFiles(data.items);
    }
  }, [data]);

  return (
    <Container className={'pt-2'}>
      <Row className={'mb-2'}>
        <Search />
      </Row>
      <Row className={'mb-2'}>
        <Col>
          {isLoading && <CustomSpinner />}

          {!isLoading && files.length > 0 && (
            <div className="grid-container-video-cards">
              {files.map((video: FileEntity) => {
                return (
                  <div key={video.id}>
                    <VideoCard id={video.id} name={video.name} />
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && files.length === 0 && (
            <div className="d-flex justify-content-center align-items-baseline mt-4">
              <p className="px-2">Nothing here ... </p>
              <Button
                className="px-2"
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setPage(1);
                  setSearch('');
                }}
              >
                clear
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Row className={'mb-2'}>
        <Col>
          {data && <Paginator videosCount={data.count} videosLimit={limit} changePage={changePage} activePage={page} />}
        </Col>
      </Row>
    </Container>
  );
};

export default VideosPage;
