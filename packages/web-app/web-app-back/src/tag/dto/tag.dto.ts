import Joi from 'joi';

export interface CreateTagDto {
  name: string;
  color: string;
}

export const tagSchemaId = Joi.string().uuid();

export const createTagSchema = Joi.object<CreateTagDto>({
  name: Joi.string().alphanum().min(2).max(128).required(),
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .required(),
});

export const updateTagSchema = Joi.object<CreateTagDto>({
  name: Joi.string().alphanum().min(2).max(128),
  color: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});
