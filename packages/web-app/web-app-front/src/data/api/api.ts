import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { FileEntity } from '../../domain';

interface DataQuery {
  page: number
  limit: number
  search: string
}

interface DataItems<T> {
  items: T[]
  count: number
}

const axiosInstance = axios.create();

const getVideosList = (query: DataQuery) => () => {
  return axiosInstance.get<DataItems<FileEntity>>('/api/list', { params: query })
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
