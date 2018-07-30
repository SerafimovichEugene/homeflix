import { getVideos } from '../services/httpService';

export const gotUserInfo = videos => ({
  type: 'GOT_VIDEOS',
  videos,
});

export const getVideosAsync = () => (dispatch) => {
  console.log(123);
  getVideos()
    .then(videos => dispatch(gotUserInfo(videos)));
};
