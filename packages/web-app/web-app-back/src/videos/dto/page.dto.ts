import Joi from 'joi';

export class VideosPageDto {
  page?: number;
  limit?: number;
  search?: string;
}

export const schema = Joi.object().keys(
  {
    page: Joi.number().min(1).max(1000),
    limit: Joi.number().min(1).max(100),
    search: Joi.string().alphanum().min(1),
  }
);