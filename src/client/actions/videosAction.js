import { getVideos } from '../services/httpService';

export const gotUserInfo = videos => ({
  type: 'GOT_VIDEOS',
  videos,
});

export const getVideosAsync = () => (dispatch) => {
  getVideos()
    .then(videos => dispatch(gotUserInfo(videos)));
};
