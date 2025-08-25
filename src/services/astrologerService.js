import { astrologerRepository } from "../repository/index.js";

// create
export const createAstrologerService = async (payload) => {
  try {
    const newAstrologer = await astrologerRepository.createAstrologer(payload);
    return {
      success: true,
      message: "astrologer created successfully",
      data: newAstrologer,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//get
export const getAstrologerService = async (payload) => {
  try {
    const { data, total, page, pages } =
      await astrologerRepository.getAstrologerList(payload);
    return {
      success: true,
      message: "list of astrologer",
      data: data,
      total,
      page,
      pages,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// update
export const updateAstrologerService = async (id, payload) => {
  try {
    const updatedAstrologer = await astrologerRepository.updateAstrologer(
      id,
      payload
    );

    return {
      success: true,
      message: "astrologer updated successfully",
      data: updatedAstrologer,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteService = async (payload) => {
  try {
    const id = payload;
    return await astrologerRepository.deleteAstrologer(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
