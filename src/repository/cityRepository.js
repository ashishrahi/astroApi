import City from "../models/cityModel.js";
import { cityPipeline } from "../Pipeline/cityPipeline.js";



export const cityRepository = {
  //  create
   createCity: async(payload)=>{
    const newCity = new City(payload);
    const savedCity = await newCity.save()
    return savedCity;
   },
  //  get
   getCityList : async(payload) =>{
    const { stateId, countryId, cityName, skip, limit } = payload;

    // validation

    const matchStage = {};
    // if (stateId) {
    //   matchStage.stateId = new mongoose.Types.ObjectId(stateId);
    // }

    // if (countryId) {
    //   matchStage.countryId = new mongoose.Types.ObjectId(countryId);
    // }

    // if (cityName) {
    //   matchStage.cityName = { $regex: cityName, $options: "i" };
    // }
   const cities = await City.aggregate(cityPipeline(matchStage={}))
   return cities;
   },
   updateCity: async(id, payload)=>{
    const updatedCity = await City.findByIdAndUpdate(id, payload)
    return updatedCity;
   }
   
}

