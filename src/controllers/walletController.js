import { StatusCodes } from "http-status-codes";
import { walletService } from "../services/index.js";

// create
export const createWallet = async(req, res)=>{
    try {
        const payload = req.body;
        const{success, message, data} = await walletService.createWalletService(payload)
        res.status(StatusCodes.CREATED).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
}
//  get
export const getWallet = async(req, res)=>{
    try {
        const payload = req.body;
        const{success, message, data} = await walletService.getWalletService(payload)
        res.status(StatusCodes.OK).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:error.message})
    }
}
// 
export const updateWallet = async(req, res)=>{
    try {
        const payload = req.body;
        const {id} = req.params;
        const{success, message, data} = await walletService.updateWalletService(id, payload)
        res.status(StatusCodes.OK).json({success, message, data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:error.message})
        
    }
}