import ServiceList from "../models/ServiceListModel.js"

export const serviceRepository = {
    // create
    createService: async(payload)=>{
       const newServiceList = new ServiceList(payload)
        const savedList = await newServiceList.save()
        return savedList  
    },
    // getService
   getServiceList : async(payload)=>{
    const{page, limit} = payload
            const pageLimit = parseInt(page, 10);
            const limitNumber  = parseInt(limit, 10)
            const skip = (pageLimit - 1) * limitNumber;
            const serviceList = await ServiceList.find().skip(skip).limit(limitNumber)
            return serviceList
   },
    // updateService
   updateServiceList: async(id, payload)=>{
      const updatedList = await ServiceList.findByIdAndUpdate( id, payload,{ new: true } )
        return updatedList
   },
   // deleteService   
   deleteService: async(id)=>{
     return await ServiceList.findByIdAndDelete(id)
   }
}

