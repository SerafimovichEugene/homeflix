import axios from 'axios';

// axios.defaults.baseURL = process.env.REST_URL;

export const getVideos = () => axios.get('/api/videos/')
  .then(res => res.data);

export const getVideo = params => axios.get('/api/video/', { params })
  .then(res => res.data);
