import { getVideos } from '../services/httpService';

export const gotVideos = (res) => {
  const {
    totalVideos,
    totalPages,
    videos,
    size,
    pageNumber,
  } = res;
  return {
    type: 'GOT_VIDEOS',
    totalVideos,
    totalPages,
    videos,
    size,
    pageNumber,
  };
};

export const getVideosAsync = params => (dispatch) => {
  getVideos(params)
    .then(res => dispatch(gotVideos(res)));
};
