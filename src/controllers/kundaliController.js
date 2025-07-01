import { StatusCodes } from "http-status-codes";
import { KundaliService } from "../services/index.js";

export const generateKundli = async(req, res)=>{
try {
    const model = req.body;
    const{success, message, data} = await KundaliService.generateKundaliService(model)
    return res.status(StatusCodes.CREATED).json({success, message, data})
    
} catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message})
}
}

export const getUserKundlis = ( req, res)=>{
try {
    
} catch (error) {
    
}
}