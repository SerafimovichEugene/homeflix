import React, { useState, useEffect } from "react";
import { VideoCard } from "./VideoCard/VideoCard";
import { FileEntity } from "../../domain";
import { Spinner } from "../../components/Spinner/Spinner";
import { useVideos } from "../../data/api/api";
import { Paginator } from "../../components/Paginator/Paginator";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../constants";
import { Container, Row, Col } from "react-bootstrap";
import { Search } from "./Search/Search";
import "./styles.css";

const VideosPage = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit] = useState(DEFAULT_LIMIT);
  const [search, setSearch] = useState("");

  const { useVideosList } = useVideos();

  const { data, isLoading, refetch } = useVideosList(search ? {
    page,
    limit,
    search,
  } : {
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
        <Search setSearch={setSearch} search={() => refetch()} />
      </Row>
      <Row>
        {isLoading && <Spinner />}
        {!isLoading &&
          data &&
          data.items.map((video: FileEntity) => {
            return (
              <Col sm="3">
                <VideoCard link={video.id} name={video.name} />
              </Col>
            );
          })}
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
