import Joi from "joi";


export const astrologerServiceValidationSchema = Joi.object({
name: Joi.string().required(),
description: Joi.string(),
basePrice: Joi.number(),
durationInMinutes: Joi.number().optional(),
status: Joi.boolean().optional()
})