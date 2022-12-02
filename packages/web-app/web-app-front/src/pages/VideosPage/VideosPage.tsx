import React, { useState, useEffect, FC } from "react";
import { VideoCard } from "./VideoCard/VideoCard";
import { FileEntity } from "../../domain";
import { CustomSpinner } from "../../components/Spinner/Spinner";
import { useVideos } from "../../data/api/api";
import { Paginator } from "../../components/Paginator/Paginator";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../constants";
import { Container, Row, Col } from "react-bootstrap";
import { Search } from "./Search/Search";
import "./styles.css";

const VideosPage: FC = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit] = useState(DEFAULT_LIMIT);
  const [search, setSearch] = useState("");

  const { useVideosList } = useVideos();

  const { data, isLoading, refetch } = useVideosList(
    search
      ? {
          page,
          limit,
          search,
        }
      : {
          page,
          limit,
        }
  );

  const changePage = (pageNumber: number): void => {
    setPage(pageNumber);
  };

  const handleSearch = (search: string): void => {
    setPage(1);
    setSearch(search);
  };

  useEffect(() => {
    refetch().then();
  }, [page, limit]);

  return (
    <Container className={"pt-2"}>
      <Row className={"mb-2"}>
        <Search setSearch={handleSearch} />
      </Row>
      <Row className={"mb-2"}>
        <div className="grid-container-video-cards">
          {isLoading && <CustomSpinner />}
          {!isLoading &&
            data &&
            data.items.map((video: FileEntity) => {
              return (
                <div key={video.id}>
                  <VideoCard link={video.id} name={video.name} />
                </div>
              );
            })}
        </div>
      </Row>
      <Row className={"mb-2"}>
        <Col>
          {data && <Paginator videosCount={data.count} videosLimit={limit} changePage={changePage} activePage={page} />}
        </Col>
      </Row>
    </Container>
  );
};

export default VideosPage;
