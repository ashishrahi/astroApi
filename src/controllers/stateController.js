import { StatusCodes } from "http-status-codes";
import { stateService } from "../services/index.js";

export const createState = async(req, res)=>{
    try {
        const payload = req.body;
        const{success, message, data} = await stateService.createStateService(payload)
         res.status(StatusCodes.CREATED).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: error.message
        })}}

export const getStates = async(req, res) =>{
    try {
        const payload = req.query;
        const{success, message, data, total, page, totalPages} = await stateService.getStateService(payload)
        res.status(StatusCodes.OK).json({success, message, data, total, page, totalPages})

    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const updatedState = async(req, res) =>{
    try {
        const payload = req.params;
        const updatedData = req.body
        const {success, message, data} = await stateService.updatedStateService(payload, updatedData)
        res.status(StatusCodes.OK).json({success, message, data})
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const deleteStates = async(req, res) =>{
    try {
        const payload = req.params;
        const {success, message, data} = await stateService.deleteStateService(payload)
        res.status(StatusCodes.OK).json({success, message, data})
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
}