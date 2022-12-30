import { createContext, Dispatch, SetStateAction } from 'react';
import { FileEntity, PageableQuery } from '../../../domain';
import { DEFAULT_PAGE } from '../../../constants';

export interface VideosPageContext extends PageableQuery {
  files: FileEntity[];
  setPage: Dispatch<SetStateAction<number>>;
  setLimit?: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setFiles: Dispatch<SetStateAction<FileEntity[]>>;
}

export const defaultContext: VideosPageContext = {
  files: [],
  search: '',
  page: 1,
  limit: 20,
  setPage: () => DEFAULT_PAGE,
  setSearch: () => '',
  setFiles: () => [],
};

export const VideosPageContextInstance = createContext(defaultContext);
