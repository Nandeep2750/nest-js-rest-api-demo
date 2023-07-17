import * as Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required().uri(),
  price: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  description: Joi.string().optional(),
  imageUrl: Joi.string().optional().uri(),
  price: Joi.string().optional(),
});

export const listPaginateProductSchema = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
  search: Joi.string().optional().allow(null, ''),
});
