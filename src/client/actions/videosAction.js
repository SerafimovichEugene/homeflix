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

export const getVideosAsync = params => (dispatch, getState) => {
  const state = getState().videosReducer;
  const { pageNumber, size } = state;
  const updatedParams = Object.assign({}, { page: pageNumber, size }, params);
  getVideos(updatedParams)
    .then(res => dispatch(gotVideos(res)));
};
