import * as Joi from 'joi';
import { USER_CONFIG } from 'src/config/constants';

export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  gender: Joi.string()
    .required()
    .valid(...Object.values(USER_CONFIG.GENDER)),
  password: Joi.string()
    .required()
    .min(USER_CONFIG.PASSWORD.MIN)
    .max(USER_CONFIG.PASSWORD.MAX),
});
