import Review from "../models/reviewModel.js";

export const reviewPipeline = async (payload) => {
  try {
    const { status = "pending", search = "", page = 1, limit = 5 } = payload;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    // pipeline
    const pipeline = []

  
    const result = Review.aggregate(pipeline)
  } catch (error) {
    throw new Error(error.message);
  }
};
