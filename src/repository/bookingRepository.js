import Booking from "../models/bookingModel.js";

export const BookingListQuery = async (model) => {
  try {
    const { status = "pending", search = "", page = 1, limit = 5 } = model;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const pipeline = [
      // Filter by status first (faster than filtering after lookups)
      { $match: { status } },

      // Join astrologer
      {
        $lookup: {
          from: "astrologers",
          localField: "astrologerId",
          foreignField: "_id",
          as: "astrologer",
        },
      },
      { $unwind: "$astrologer" },

      // Join user
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // Search filter (case-insensitive) across multiple fields
      {
        $match: {
          $or: [
            { "user.name": { $regex: search, $options: "i" } },
            { "astrologer.name": { $regex: search, $options: "i" } },
            { consultationType: { $regex: search, $options: "i" } }
          ]
        }
      },

      // Select final fields
      {
        $project: {
          userName: "$user.name",
          astrologerName: "$astrologer.name",
          consultationType: 1,
          date: 1,
          time: 1,
          purpose: 1,
          paymentStatus: 1,
          status: 1
        },
      },

      // Sort by date (newest first)
      { $sort: { date: -1 } },

      // Pagination
      { $skip: skip },
      { $limit: limitNumber },
    ];

    return await Booking.aggregate(pipeline);
  } catch (error) {
    throw new Error(error.message);
  }
};
