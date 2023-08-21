import React, { FC, PropsWithChildren, useState } from 'react';
import { VideosPageContextInstance } from './VideosPageContext';
import { DEFAULT_LIMIT } from '../../../constants';
import { CREATED, DESC, FileEntity, SortByUnion, SortToUnion } from '../../../domain';

export const VideosPageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [files, setFiles] = useState<FileEntity[]>([]);
  const [sortTo, setSortTo] = useState<SortToUnion>(DESC);
  const [sortBy, setSortBy] = useState<SortByUnion>(CREATED);
  return (
    <VideosPageContextInstance.Provider
      value={{
        page,
        limit,
        search,
        files,
        setPage,
        setLimit,
        setSearch,
        setFiles,
        sortTo,
        setSortTo,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </VideosPageContextInstance.Provider>
  );
};
