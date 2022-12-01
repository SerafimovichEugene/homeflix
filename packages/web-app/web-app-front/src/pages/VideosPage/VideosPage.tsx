import React, { useState, useEffect } from "react";

import { VideoCard } from "./VideoCard/VideoCard";
import { FileEntity } from "../../domain/index";
import { Spinner } from "../../components/Spinner/Spinner";
import { useVideos } from "../../data/api/api";
import { Paginator } from "../../components/Paginator/Paginator";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../constants";
import "./styles.css";

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
    refetch();
  }, [page, limit]);

  return (
    <div className="container-md container-main">
      <div className="grid-container-video-cards">
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
      </div>
      {data && <Paginator videosCout={data.count} videosLimit={limit} changePage={changePage} activePage={page} />}
    </div>
  );
};

export default VideosPage;
