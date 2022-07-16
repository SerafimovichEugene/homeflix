
export type PaginationProps = { page?: number; limit?: number };

export const MAX_LIST_LIMIT = 1000000;
export const DEFAULT_PAGE_SIZE = 25;

const clamp = (value: number, minVal: number, maxVal: number): number => Math.max(Math.min(value, maxVal), minVal);
const isBadLimit = (limit: number): boolean => Number.isNaN(limit) || (limit | 0) < 1 || (limit | 0) > MAX_LIST_LIMIT;

export default function getLimitOffset(props: PaginationProps | null | undefined, count = 0): LimitOffset {
  let offset = 0;

  if (!props || (props.page == null && props.limit == null)) {
    return new LimitOffset(clamp(count || MAX_LIST_LIMIT, 0, MAX_LIST_LIMIT), offset);
  }

  const limit = props.page != null && props.limit == null ? DEFAULT_PAGE_SIZE : Number(props.limit);

  if (isBadLimit(limit)) {
    throw new Error('Invalid pagination arguments');
  }

  if (props.page != null) {
    const page = Number(props.page);

    if (Number.isNaN(page) || (page | 0) < 1 || (count > 0 && (page | 0) > Math.floor((count - 1) / (limit | 0)) + 1)) {
      throw new Error('Invalid pagination arguments');
    }

    offset = ((page | 0) - 1) * (limit | 0);
  }

  return new LimitOffset(limit | 0, offset);
}

class LimitOffset extends Array {
  constructor(limit: number, offset: number) {
    super();
    this.push(limit, offset);
  }

  get limit(): number {
    return this[0];
  }

  get offset(): number {
    return this[1];
  }
}
