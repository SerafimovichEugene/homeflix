import { PaginationProps } from './common/get-limit-ofsset';

export interface Pageable<T> extends PaginationProps {
  items: T[];
}
