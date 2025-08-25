import { StatusCodes } from "http-status-codes";
import { notificationService } from "../services/index.js";

export const createNotificationController = async(req, res)=>{
    try {
        const payload = req.body;
        const {success, message, data} = await notificationService.createNotificationService(payload)
         res.status(StatusCodes.CREATED).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
} 