import Joi from "joi";
import { objectId } from "../utilities/customObjectid";


export const notificationValidationSchema = Joi.object({
    userId: Joi.string().custom(objectId).required(),
    title: Joi.string().optional(),
    message: Joi.string().optional(),
    type: Joi.string().valid("push", "toast").default("push"),
    read: Joi.boolean().default(false)
}) 