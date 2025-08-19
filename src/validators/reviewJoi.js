import Joi from "joi";
import { objectId } from "../utilities/customObjectid";

export const reviewValidationSchema = Joi.object({
    userId: Joi.string().custom(objectId).required(),
    astrologerId: Joi.string().custom(objectId).required(),
    bookingId: Joi.string().custom(objectId).required(),
    rating: Joi.string().optional(),
    comment: Joi.string().optional()

})