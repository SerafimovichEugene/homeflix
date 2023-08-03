import Joi from 'joi';

export const NAME = 'name';
export const CREATED = 'created';
export const SIZE = 'size';

export const ASC = 'ASC';
export const DESC = 'DESC';

export type SortTo = typeof ASC | typeof DESC;
export type SortBy = typeof NAME | typeof CREATED | typeof SIZE;

export interface ISortable {
  sortBy?: SortBy;
  sortTo?: SortTo;
}

export interface VideosPageDto extends ISortable {
  page?: number;
  limit?: number;
  search?: string;
}

export interface VideoDto {
  id: string;
  path: string; // TODO useless field
  name: string;
  created: string;
  size: number;
}

export const schema = Joi.object().keys({
  page: Joi.number().min(1).max(1000),
  limit: Joi.number().min(1).max(100),
  search: Joi.string().min(1),
  sortBy: Joi.string().valid(NAME, CREATED, SIZE).default(NAME),
  sortTo: Joi.string().valid(ASC, DESC).default(ASC),
});

export const schemaId = Joi.string().uuid();
