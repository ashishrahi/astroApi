import Joi from "joi";
import { objectId } from "../utilities/customObjectid";


export const kundaliValidationSchema = Joi.object({
    user: Joi.string().custom(objectId).optional(),
    name: Joi.string().optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    dob: Joi.string().required(),
    tob: Joi.string().required(),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    timezone: Joi.string(),
    kundaliData: Joi.any().optional()
})