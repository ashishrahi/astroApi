import { serviceRepository } from "../repository/index.js";

export const createServiceList = async(payload)=>{
try {
    const savedList = await serviceRepository.createService(payload);
    return {
        success: true,
        message: "new service created successfully",
        data: savedList
    }
} catch (error) {
    return{
        success: false,
        message: error.message
    }
}
}

export const getServiceList = async(payload) => {
    try {
        const serviceList = await serviceRepository.getServiceList(payload);
        return{
             success: true,
             message: "list of service",
             data: serviceList
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const updateServiceList = async(id,payload) =>{
    try {
          const result = await serviceRepository.updateServiceList(id,payload)
          return{
            success: true,
            message: "service list updated successfully",
            data: result
          }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
        
    }
}

export const deleteServiceList = async(id) =>{
    try {
        const result = await serviceRepository.deleteService(id)
        return{
            success: true,
            message: "service deleted successfully"

        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
        
    }
}