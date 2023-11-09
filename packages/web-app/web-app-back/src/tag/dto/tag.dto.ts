import Joi from 'joi';

export interface TagDto {
  name: string;
  color: string;
}

export const tagSchemaId = Joi.string().uuid();

export const createTagSchema = Joi.object<TagDto>({
  name: Joi.string().alphanum().min(2).max(128).required(),
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .required(),
});

export const updateTagSchema = Joi.object<TagDto>({
  name: Joi.string().alphanum().min(2).max(128),
  color: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});
