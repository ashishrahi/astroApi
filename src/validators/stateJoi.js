import Joi from 'joi';
import objectId from '../utilities/customObjectid.js';

export const stateValidationSchema = Joi.object({
  stateName: Joi.string().required(),
  stateCode: Joi.string().optional(),
  countryId: objectId.optional()
});
