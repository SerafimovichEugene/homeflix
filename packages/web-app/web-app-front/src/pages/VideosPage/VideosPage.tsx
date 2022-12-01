import React, { useState, useEffect } from "react";
import { VideoCard } from "./VideoCard/VideoCard";
import { FileEntity } from "../../domain";
import { Spinner } from "../../components/Spinner/Spinner";
import { useVideos } from "../../data/api/api";
import { Paginator } from "../../components/Paginator/Paginator";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../constants";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";

const VideosPage = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit] = useState(DEFAULT_LIMIT);

  const { useVideosList } = useVideos();

  const { data, isLoading, refetch } = useVideosList({
    page,
    limit,
  });

  const changePage = (pageNumber: number): void => {
    setPage(pageNumber);
  };

  useEffect(() => {
    refetch().then();
  }, [page, limit]);

  return (
    <Container>
      <Row>
        <Col>
          {isLoading && <Spinner />}
          {!isLoading &&
            data &&
            data.items.map((video: FileEntity) => {
              return (
                <div key={video.id}>
                  <VideoCard link={video.id} name={video.name} />
                </div>
              );
            })}
        </Col>
      </Row>
      <Row>
        <Col>
          {data && <Paginator videosCout={data.count} videosLimit={limit} changePage={changePage} activePage={page} />}
        </Col>
      </Row>
    </Container>
  );
};

export default VideosPage;
