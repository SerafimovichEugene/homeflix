import axios from 'axios';

// axios.defaults.baseURL = process.env.REST_URL;

export const getVideos = params => axios.get('/api/videos/', { params })
  .then(res => res.data);

export const getVideo = (params, id) => axios.get(`/api/video/${id}`, { params })
  .then(res => res.data);
