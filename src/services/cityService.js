import { createCityQuery, getCityQuery } from "../repository/cityRepository.js";

export const createcityService = (payload) => {
  try {
    // validation
    const { cityName, cityCode, stateId, countryId } = payload;
    if (!cityName || !cityCode || !stateId || countryId) {
      new Error("filled required field");
    }
    const newCity = createCityQuery(payload);
    if (newCity) {
      return {
        success: true,
        message: "city created successfully",
        data: newCity,
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
    const result = await getCityQuery(payload);
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
