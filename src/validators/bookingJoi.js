import Joi from "joi";
import {objectId} from '../utilities/customObjectid'


export const bookingValidationSchema = Joi.object({
    user: Joi.string().custom(objectId).optional(),
    astrologer: Joi.string().custom(objectId).optional(),
    roomId: Joi.string().required(),
    consultationType: Joi.string().optional(),
    date: Joi.date().optional(),
    time: Joi.string().optional(),
    purpose: Joi.string().optional(),
    status: Joi.string().valid("pending", "confirmed", "cancelled", "completed").default("pending"),
    paymentStatus: Joi.string().valid("unpaid", "paid", "refunded").default("unpaid"),
    duration: Joi.string().optional(),
    cost: Joi.string().optional()
})