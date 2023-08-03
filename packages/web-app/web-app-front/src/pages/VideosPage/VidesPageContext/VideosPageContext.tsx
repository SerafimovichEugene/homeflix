import { createContext, Dispatch, SetStateAction } from 'react';
import { ASC, FileEntity, NAME, PageableQuery, Sortable, SortByUnion, SortToUnion } from '../../../domain';
import { DEFAULT_PAGE } from '../../../constants';

export interface VideosPageContext extends PageableQuery, Sortable {
  files: FileEntity[];
  setPage: Dispatch<SetStateAction<number>>;
  setLimit?: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setFiles: Dispatch<SetStateAction<FileEntity[]>>;
  setSortBy: Dispatch<SetStateAction<SortByUnion>>;
  setSortTo: Dispatch<SetStateAction<SortToUnion>>;
}

export const defaultContext: VideosPageContext = {
  files: [],
  search: '',
  page: 1,
  limit: 20,
  sortBy: NAME,
  sortTo: ASC,
  setPage: () => DEFAULT_PAGE,
  setSearch: () => '',
  setFiles: () => [],
  setSortBy: () => NAME,
  setSortTo: () => ASC,
};

export const VideosPageContextInstance = createContext(defaultContext);
