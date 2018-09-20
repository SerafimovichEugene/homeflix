import { getVideos } from '../services/httpService';

export const goVideos = videos => ({
  type: 'GOT_VIDEOS',
  videos,
});

export const getVideosAsync = () => (dispatch) => {
  getVideos()
    .then(videos => dispatch(goVideos(videos)));
};
