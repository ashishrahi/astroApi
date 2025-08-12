import Astrologer from "../models/astrologerModel.js"
import { createAstrologerQuery, AstrologerListQuery } from "../repository/astrologerRepository.js"


export const createAstrologerService = async(model)=>{
    try {
           
        const newAstrologer = await createAstrologerQuery(model)
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

export const getAstrologerService = async(model)=>{
    try {
        const listAstrologer = await AstrologerListQuery(model)
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

export const updateProfileService = async(model,id)=>{
    try {
        const updatedProfile = await Astrologer.findByIdAndUpdate(id, model,{new: true})
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