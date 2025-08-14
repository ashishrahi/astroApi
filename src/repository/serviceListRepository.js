import ServiceList from "../models/ServiceListModel.js"

export const CreateServiceListQuery = async(payload)=>{
    try {
        const newServiceList = new ServiceList(payload)
        const savedList = await newServiceList.save()
        return savedList
    } catch (error) {
        throw new Error(error.message)
    }
} 

export const GetServiceListQuery = async(payload)=>{
    try {
            const{page, limit} = payload
            const pageLimit = parseInt(page, 10);
            const limitNumber  = parseInt(limit, 10)
            const skip = (pageLimit - 1) * limitNumber;
            const serviceList = await ServiceList.find().skip(skip).limit(limitNumber)
            return serviceList
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateListQuery = async(id, payload)=>{
    try {
        console.log('adfa', payload, id)
        const updatedList = await ServiceList.findByIdAndUpdate( id, payload,{ new: true } )
        return updatedList
    } catch (error) {
        throw new Error(error.message)
        
    }
}

export const deleteServiceQuery = async(id) =>{
    try {
        return await ServiceList.findByIdAndDelete(id)
    } catch (error) {
        throw new Error(error.message)
    }
}