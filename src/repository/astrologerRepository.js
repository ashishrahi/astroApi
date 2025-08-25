import Astrologer from "../models/astrologerModel.js";

export const astrologerRepository = {
  
  // create
  createAstrologer: async(payload)=>{
    const newAstrologer = new Astrologer(payload);
    const savedAstrologer = newAstrologer.save()
    return savedAstrologer
  },

  // findbyId
  findAstrologerById : async(id)=>{
    const existAstrologer = await Astrologer.findById(id);
    return existAstrologer;
  },


  // getastrologer

    getAstrologerList: async(payload)=>{
    const { page = 1, limit = 5 } = payload;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const astrologerlist = await Astrologer.find()
      .skip(skip)
      .limit(limitNumber)
      .exec();
    const total = await Astrologer.countDocuments();
    return {
      data: astrologerlist,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    };
  },
  
  // update
  updateAstrologer: async(id, payload) =>{
    const updatedAstrologer = await Astrologer.findByIdAndUpdate(id, payload, {new:true})
    return updatedAstrologer;
  },

  // delete
  deleteAstrologer: async(id)=>{
    const deletedAstrologer = await Astrologer.findByIdAndDelete(id)
    return deletedAstrologer
  }
 }






