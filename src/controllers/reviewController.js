import { StatusCodes } from "http-status-codes"
import { reviewService } from "../services/index.js"

export const createReview = async(req, res)=>{
    try {
        const payload = req.body
        const{success, message, data} = await reviewService.createReviewService(payload)
        res.status(StatusCodes.CREATED).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message:error.message})
    }
}
export const getReviewList = async(req, res)=>{
    try {
        const payload = req.query;
        const {success, message, data} = await reviewService.getReviewService(payload)
        res.status(StatusCodes.OK).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message:error.message})
    }
}