import logger from "../Config/logger.js";
import {
  createCountry,
  findCountryByName,
  getCountries,
  updatedCountry,
  deletedCountry,
} from "../repository/countryRepository.js";

//  create Country
export const createCountryService = async (payload) => {
  try {
    const { countryName, countryCode } = payload;
    logger.info(`Received payload: ${JSON.stringify(payload)}`);

    if (!countryName || !countryCode) {
      throw new Error("Country name and code are required");
    }

    // check if country already exist

    const isCountry = await findCountryByName(countryName);
    if (isCountry) {
      logger.warn(`Duplicate country detected: ${countryName}`);
      return {
        success: false,
        message: "country already exists",
      };}

    const newCountry = await createCountry({ countryName, countryCode });
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

    const result = await getCountries({
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
    const updateCountry = await updatedCountry(id, updatedData);
    if (updatedCountry) {
      return {
        success: true,
        message: "country updated successfully",
        data: updateCountry,
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
    const isdeleteCountry = await deletedCountry(id);
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
