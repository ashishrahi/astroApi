import City from "../models/cityModel.js";

// create City
export const createCityQuery = async (payload) => {
  try {
    const newCity = new City(payload);
    return await newCity.save();
  } catch (error) {
    return error.message;
  }};
  
// getCity
export const getCityQuery = async (payload) => {
  try {
    const { stateId, countryId, cityName, skip, limit } = payload;

    // validation

    const matchStage = {};
    if (stateId) {
      matchStage.stateId = new mongoose.Types.ObjectId(stateId);
    }

    if (countryId) {
      matchStage.countryId = new mongoose.Types.ObjectId(countryId);
    }

    if (cityName) {
      matchStage.cityName = { $regex: cityName, $options: "i" };
    }

    // Pipeline
    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "states",
          localfield: "stateId",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $unwind: { path: "$state", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "countries",
          localfield: "countryId",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
    ];

    const cities = await City.aggregate(pipeline);
    return cities;
  } catch (error) {
    return error.message;
  }
};
