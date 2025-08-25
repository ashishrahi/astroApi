import { cityRepository } from "../repository/index.js";

export const createcityService = async(payload) => {
  try {
    // validation
    const { cityName, cityCode, stateId, countryId } = payload;
    if (!cityName || !cityCode || !stateId || countryId) {
      new Error("filled required field");
    }
    const savedCity = await cityRepository.createCity(payload);
    if (savedCity) {
      return {
        success: true,
        message: "city created successfully",
        data: savedCity,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCityService = async (payload) => {
  try {
    const result = await cityRepository.getCityList(payload);
    if (result) {
      return {
        success: true,
        message: "List of City",
        data: result,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateCityService = async(id,payload) =>{
try {
  const result = await cityRepository.updateCity(id, payload)
  return{
    success: true,
    message: "city updated successfully",
    data: result
  }
} catch (error) {
    throw new Error(error.message)
}}
