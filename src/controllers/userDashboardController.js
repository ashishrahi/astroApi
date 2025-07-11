import {userDashboardService} from '../services/index.js'

export const getUserDashboard= async(req, res)=>{
try {
    const model = req.params
    console.log("model:",model)
    const {success, message, data} = await userDashboardService.getDashboarUserService(model)
    return res.status(201).json({
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