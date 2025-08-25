import Country from "../models/countryModel.js";

export const countryRepository = {

 // create
  createCountry: async (payload) => {
    const newCountry = new Country(payload);
    const savedCountry = newCountry.save();
    return savedCountry;
  },
//  getbyId 
  findCountrybyId: async (payload) => {
    const id = payload;
    const existCountry = await Country.findById(id);
    return existCountry;
  },

  // findByCountryName
  findCountrybyName: async(payload) =>{
    const {countryName} = payload;
    const existingCountry = await Country.findOne({countryName: countryName})
   return existingCountry;
  },

//   getCountry
  getCountryList: async ({ page, limit, search = "" }) => {
    const skip = (page - 1) * limit;
    const query = search
      ? { countryName: new RegExp(search, "i") }
      : {};
    const [countries, total] = await Promise.all([
      Country.find(query).skip(skip).limit(limit),
      Country.countDocuments(query),
    ]);
    return {
      countries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },
  // updated country
  updatedCountry: async(id, updatedData)=>{
  return await Country.findByIdAndUpdate(id, updatedData, { new: true });

  },
  // deleted country
  deletedCountry: async(id)=>{
    return Country.findByIdAndDelete(id);
  }
};



