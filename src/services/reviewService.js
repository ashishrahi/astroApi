import { reviewRepository } from "../repository/index.js";

export const createReviewService = async (payload) => {
  try {
    const result = await reviewRepository.reviewCreateQuery(payload);
    return {
        success: true,
        message: "review created successfully",
        data: result
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getReviewService = async (payload) => {
  try {
    const result = await reviewRepository.reviewGetQuery(payload);
    return result;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
