import Joi from "joi";

export const userValidationSchema = Joi.object({
   name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  birthPlace: Joi.string().optional(),
  birthDate: Joi.string().optional(),
  status: Joi.boolean().default(true), 
  astrologerId: Joi.string().allow(null).optional(),
  role: Joi.string().valid("user", "astrologer", "admin").default("user"),
  token: Joi.string().optional(),

}).options({ stripUnknown: true });