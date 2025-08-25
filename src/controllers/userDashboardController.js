import { StatusCodes } from 'http-status-codes'
import {userDashboardService} from '../services/index.js'

export const getUserDashboard= async(req, res)=>{
try {
    const payload = req.body
    const {success, message, data} = await userDashboardService.getDashboarUserService(payload)
    return res.status(StatusCodes.OK).json({
        success,
        message,
        data
    })
    
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
}
}