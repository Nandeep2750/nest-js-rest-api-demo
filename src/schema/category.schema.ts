import * as Joi from 'joi';
import { CATEGORY_CONFIG } from 'src/config/constants';

export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(CATEGORY_CONFIG.STATUS_TYPE)),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(CATEGORY_CONFIG.STATUS_TYPE)),
});
