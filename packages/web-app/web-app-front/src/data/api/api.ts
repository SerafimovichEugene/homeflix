import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { FileEntity } from '../../domain';

interface DataQuery {
  page: number
  limit: number
}

interface DataItems<T> {
  items: T[]
  count: number
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8282'
});

const getVideosList = (query: DataQuery) => () => {
  return axiosInstance.get<DataItems<FileEntity>>('/list', { params: query })
    .then(({ data }) => data);
};

export const useVideos = () => {
  return useMemo(() => ({
    useVideosList: (query: DataQuery) => useQuery(
      ['videos', query.page],
      getVideosList(query),
      { keepPreviousData: true },
    )
  }), [])
}
