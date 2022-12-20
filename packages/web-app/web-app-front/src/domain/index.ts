export interface FileEntity {
  id: string;
  path: string;
  name: string;
}

export interface PageableQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface DataItems<T> {
  items: T[];
  count: number;
}
