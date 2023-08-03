export interface FileEntity {
  id: string;
  path: string;
  name: string;
}

export interface PageableQuery extends Sortable {
  page: number;
  limit: number;
  search?: string;
}

export interface Sortable {
  sortTo: SortToUnion;
  sortBy: SortByUnion;
}

export const NAME = 'name';
export const CREATED = 'created';
export type SortByUnion = typeof NAME | typeof CREATED | typeof SIZE;

export const SIZE = 'size';
export const ASC = 'ASC';
export const DESC = 'DESC';
export type SortToUnion = typeof ASC | typeof DESC;

export interface DataItems<T> {
  items: T[];
  count: number;
}
