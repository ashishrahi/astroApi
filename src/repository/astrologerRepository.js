import Astrologer from "../models/astrologerModel.js";

// create astrologers
export const createAstrologerQuery = async (model) => {
  try {
    const newAstrologer = new Astrologer(model);
    const savedAstrologer = await newAstrologer.save();

    return savedAstrologer
  } catch (error) {
    throw new Error(error.message);
  }
};

// list astrologers
export const AstrologerListQuery = async (model) => {
  try {
    const { page = 1, limit = 5 } = model;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const astrologerlist = await Astrologer.find()
      .skip(skip)
      .limit(limitNumber)
      .exec();
    const total = await Astrologer.countDocuments();
    return {
      data: astrologerlist,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
