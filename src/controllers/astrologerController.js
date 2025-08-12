import {astrologerService} from '../services/index.js' 


export const createAstrologer= async(req, res)=>{
try {
    const model = req.body

    const {success, message, data} = await astrologerService.createAstrologerService(model)
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

export const getAstrologer = async(req, res)=>{
    try {
        const model = req.query
        const {success, message, data} = await astrologerService.getAstrologerService(model)
        return res.status(200).json({
            success,
            message,
            data
        })
    } catch (error) {
        return res.status(500).json({
            success,
            message
        })
    }
}

export const profileAstrologer = async(req, res) =>{
    try {
        const model = req.params
        const {success, message, data} = await astrologerService.profileService(model)
        res.status(200).json({
            success,
            message,
            data
           })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            
        })
    }
}

export const updateAstrologerProfile = async(req, res)=>{
    try {
        const {id} = req.params;
        const model = req.body;

        const{success, message, data} = await astrologerService.updateProfileService(model, id)
        res.status(201).json({
            success,
            message,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
        
    }
}

export const toggleAvailability = async(req, res)=>{
    try {
        const model = req.params;
        const {success, message, data} = await astrologerService.toggleAvailabilityService(model)
        res.status(201).json({
            success,
            message
        }) 
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}