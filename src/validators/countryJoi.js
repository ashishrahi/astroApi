import Joi from "joi";

export const countrySchemaValidation = Joi.object({
    countryName: Joi.string().required(),
    countryCode: Joi.string().optional()
})
