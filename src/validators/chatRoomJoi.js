import Joi from "joi";
import {objectId} from '../utilities/customObjectid.js'

export const chatRoomValidationSchema = Joi.object({
    roomId: Joi.string().required(),
    bookingId: Joi.string().custom(objectId).optional(),
    userId: Joi.string().custom(objectId).required(),
    astrologerId: Joi.string().custom(objectId).required(),
    createdAt: Joi.date().optional()
})
