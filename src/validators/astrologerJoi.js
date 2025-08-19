import Joi from "joi";

export const astrologerValidationSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().optional(),
    specialties: Joi.array().items(Joi.string()).optional(),
    languages: Joi.array().items(Joi.string()).optional(),
    email: Joi.string().email().optional(),
    chatRate: Joi.number().optional(),
    callRate: Joi.number().optional(),
    videoRate: Joi.number().optional(),
    experience: Joi.number().optional(),
    isOnline: Joi.string().valid("active", "inactive").optional(),
    phone: Joi.string().optional(),
    isAvailable: Joi.boolean().optional(),
    rating: Joi.number().min(0).max(5).optional(),
    status: Joi.string().valid("active", "inactive").optional(),

}).min(1);