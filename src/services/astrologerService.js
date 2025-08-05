import Astrologer from "../models/astrologerModel.js"
import { astrologerValidationSchema } from "../validators/astrologerJoi.js"


export const createAstrologerService = async(model)=>{
    try {
           
        const newAstrologer = new Astrologer(model)
        await newAstrologer.save()
        return{
            success: true,
            message: "astrologer created successfully",
            data: newAstrologer
        }
        
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const getAstrologerService = async()=>{
    try {
        const listAstrologer = await Astrologer.find()
        return{
            success: true,
            message: 'list of astrologer',
            data: listAstrologer
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const profileService = async(model)=>{
    try {
        const {id} = model
        const profile = await Astrologer.findOne({id:id})
            return{
                success: true,
                message: "profile has been fetched",
                data: profile
            }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
        
    }
}

export const updateProfileService = async(model)=>{
    try {
          const {id}= model
        const updatedProfile = await Astrologer.findByIdAndUpdate(id, req.body,{new: true})
        return{
            success: true,
            message: "profile updated successfully",
            data: updatedProfile
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const toggleAvailabilityService = async(model)=>{
    try {
        const {id} = model;
        const astrologer  = await Astrologer.findById(id)
         astrologer.isAvailable = !astrologer.isAvailable
         await astrologer.save()
         return {
            success: true,
            message: `astrologer is ${astrologer.isAvailable}`
         }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}