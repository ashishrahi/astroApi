import logger from "../Config/logger.js";
import {
  stateRepository,
} from "../repository/index.js";

// createState
export const createStateService = async (payload) => {
  try {
    const { stateName, stateCode, countryId } = payload;
    if (!stateName || !stateCode || !countryId) {
      logger.error("stateName is required");
      new Error("filled required filled");
    }
    const existingState = await stateRepository.findStatebyName(payload);
    if (existingState) {
      return {
        success: true,
        message: "state already exists",
      };
    }
    const newState = await stateRepository.createState(payload);
    return {
      success: true,
      message: "state created successfully",
      data: newState,
    };
  } catch (error) {
    return {
      success: true,
      message: error.message,
    };
  }
};

// getState
export const getStateService = async (payload) => {
  try {
    const {states, total, page, totalPages} = await stateRepository.getStateList(payload);
    return {
      success: true,
      message: "list of states",
      data: states,
      total: total,
      page: page,
      totalPages: totalPages,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//  updatedStateService
export const updatedStateService = async (payload, updatedData) => {
  try {
    const {id} = payload;
    if (!id) {
      logger.error("id not exist");
      new Error("state id is not correct");
    }
    const result = await stateRepository.updateState(id, updatedData);
    return {
      success: true,
      message: "state update successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// deleteStateService
export const deleteStateService = async (payload) => {
  try {
    const { id } = payload;
    if (!id) {
      new Error("Id should be valid");
    }

    const result = await stateRepository.updateState(id);
    if (result) {
      return {
        success: true,
        message: "state updated successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
