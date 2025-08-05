import {
  findStateByNameQuery,
  createStateQuery,
  getStateQuery,
  updatedStateQuery,
} from "../repository/stateRepository.js";

// createState
export const createStateService = async (payload) => {
  try {
    const { stateName, stateCode, countryId } = payload;
    if (!stateName || !stateCode || !countryId) {
      new Error("filled required filled");
    }
    const existingState = await findStateByNameQuery(stateName);
    if (existingState) {
      return {
        success: true,
        message: "state already exists",
      };
    }
    const newState = await createStateQuery(payload);
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
    const { page, limit, search = "" } = payload;
    const result = await getStateQuery({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });
    return {
      success: true,
      message: "list of states",
      data: result.data,
      total: result.total,
      page: result.page,
      totalPages: result.page,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//  updatedStateService
export const updatedStateService = async (payload) => {
  try {
    const id = payload;
    const updatedData = req.body;
    if (!id) {
      new Error("state id is not correct");
    }
    const result = await updatedStateQuery(id, updatedData);
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

    const result = await updatedStateQuery(id);
    if (result) {
        return{
            success: true,
            message: "state updated successfully"
        }
    }
  } catch (error) {
    return{
        success: false,
        message: error.message
    }
  }
};
