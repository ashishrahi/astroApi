import { StatusCodes } from "http-status-codes";
import { astrologerServiceListService } from "../services/index.js";

export const createAstrologerServicesList = async(req, res)=>{
try {
    const payload = req.body;
    const {success, message, data} =  await astrologerServiceListService.createServiceList(payload)
    res.status(StatusCodes.CREATED).json({success, message, data})
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
}   
}

export const getAstrologerServicesList = async(req, res) =>{
try {
    const payload = req.query;
    const{success, message, data} = await astrologerServiceListService.getServiceList(payload)
    res.status(StatusCodes.OK).json({success, message, data})
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: error.message})
}
}

export const updatedAstrologerServicesList = async(req, res)=>{
try {
    const {id} = req.params;
    const payload = req.body
    const {success, message, data} = await astrologerServiceListService.updateServiceList(id, payload)
    res.status(StatusCodes.OK).json({success, message, data})
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
}
}

export const deletedAstrologerServicesList = async(req, res)=>{
try {
    const { id } = req.params;
    const {success, message, data} = await astrologerServiceListService.deleteServiceList(id)
    res.status(StatusCodes.OK).json({success, message, data})
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
}
}