import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
  GOOGLE_MAPS_API_KEY: Joi.string().required(),
});
