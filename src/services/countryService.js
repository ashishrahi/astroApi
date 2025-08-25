import logger from "../Config/logger.js";
import {
  countryRepository,
} from "../repository/index.js";

//  create Country
export const createCountryService = async (payload) => {
  try {
    const { countryName, countryCode } = payload;

    if (!countryName || !countryCode) {
      logger.error("country validation failed")
      throw new Error("Country name and code are required");
    }

    // check if country already exist

    const isCountry = await countryRepository.findCountrybyName({countryName:payload.countryName})

    if (isCountry) {
      logger.warn(`Duplicate country detected: ${countryName}`);
      return {
        success: false,
        message: "country already exists",
      };}

    const newCountry = await countryRepository.createCountry(payload);
    logger.info(`Country created: ${newCountry._id}`);

    return {
      success: true,
      message: "country created successfully",
      data: newCountry,
    };
  } catch (error) {
    logger.error(`Error in createCountryService: ${error.message}`);

    return {
      success: false,
      message: "Error creating country",
      error: error.message,
    };
  }
};

// get country
export const getCountryService = async (payload) => {
  try {
    const { page, limit, search = '' } = payload;

    const result = await countryRepository.getCountryList({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });

    return {
      success: true,
      message: "list of countries",
      data: result.countries,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// updateCountryService
export const updateCountryService = async (payload, updatedData) => {
  try {
    const { id } = payload;
    if (!id) {
      throw new Error("Country Id is required");
    }
    const updatedCountry = await countryRepository.updatedCountry(id, updatedData);

    if (updatedCountry) {
      return {
        success: true,
        message: "country updated successfully",
        data: updatedCountry,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// deleteCountryService
export const deleteCountryService = async (payload) => {
  try {
    const id = payload;
    const isdeleteCountry = await countryRepository.deletedCountry(id);
    if (isdeleteCountry) {
      return {
        success: true,
        message: "country deleted successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
