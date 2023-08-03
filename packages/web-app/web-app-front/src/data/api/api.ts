import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { DataItems, FileEntity, PageableQuery } from '../../domain';

const axiosInstance = axios.create();

const getVideosList = (query: PageableQuery) => () => {
  return axiosInstance.get<DataItems<FileEntity>>('/api/videos', { params: query }).then(({ data }) => data);
};

export const useVideos = () => {
  return useMemo(
    () => ({
      useVideosList: (query: PageableQuery) => {
        const { page, limit, search, sortTo, sortBy } = query;
        return useQuery(
          ['videos', page, limit, search, sortTo, sortBy],
          getVideosList(search ? { page, limit, search, sortTo, sortBy } : { page, limit, sortTo, sortBy }),
          {
            keepPreviousData: true,
            retry: false,
          },
        );
      },
    }),
    [],
  );
};
