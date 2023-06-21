import * as Joi from 'joi';
import { ADMIN_CONFIG } from 'src/config/constants';

export const createAdminSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(ADMIN_CONFIG.PASSWORD.MIN)
    .max(ADMIN_CONFIG.PASSWORD.MAX),
});

export const loginAdminSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(ADMIN_CONFIG.PASSWORD.MIN)
    .max(ADMIN_CONFIG.PASSWORD.MAX),
});

export const updateAdminSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().optional().email(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .required()
    .min(ADMIN_CONFIG.PASSWORD.MIN)
    .max(ADMIN_CONFIG.PASSWORD.MAX),
  newPassword: Joi.string()
    .required()
    .min(ADMIN_CONFIG.PASSWORD.MIN)
    .max(ADMIN_CONFIG.PASSWORD.MAX),
});
