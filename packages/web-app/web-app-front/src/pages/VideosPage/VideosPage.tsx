import React, { FC, useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { VideoCard } from "./VideoCard/VideoCard";
import { FileEntity } from "../../domain";
import { CustomSpinner } from "../../components/Spinner/Spinner";
import { Paginator } from "../../components/Paginator/Paginator";
import { useVideos } from "../../data/api/api";
import { Search } from "./Search/Search";
import { VideosPageContext, VideosPageContextInstance } from "./VidesPageContext/VideosPageContext";
import "./styles.css";

const VideosPage: FC = ({}) => {
  const { page, setPage, limit, search, setSearch, files, setFiles } =
    useContext<VideosPageContext>(VideosPageContextInstance);

  console.log(page, limit, search);

  const { useVideosList } = useVideos();

  const { data, isLoading, refetch } = useVideosList({
    page,
    limit,
    search,
  });

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

  useEffect(() => {
    if (data) {
      setFiles(data.items);
    }
  }, [data]);

  return (
    <Container className={"pt-2"}>
      <Row className={"mb-2"}>
        <Search setSearch={handleSearch} />
      </Row>
      <Row className={"mb-2"}>
        <Col>
          <div className="grid-container-video-cards">
            {isLoading && <CustomSpinner />}
            {!isLoading &&
              files.map((video: FileEntity) => {
                return (
                  <div key={video.id}>
                    <VideoCard id={video.id} name={video.name} />
                  </div>
                );
              })}
          </div>
        </Col>
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
