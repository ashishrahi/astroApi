
import mongoose from "mongoose";

export const WalletPipeline = ({ userId, page, limit, search } = {}) => {
  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        id: 1,
        userId: 1,
        name: "$user.name",
        type: 1,
        amount: 1,
        status: 1
      }
    }
  ];

  // --- Search ---
  if (search && search.trim() !== "") {
    pipeline.push({
      $match: {
        $or: [
          { "user.name": { $regex: search, $options: "i" } }, // use nested field
          { type: { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } }
        ]
      }
    });
  }

  // --- Filter by userId if provided ---
  if (userId) {
    pipeline.push({
      $match: { userId: new mongoose.Types.ObjectId(userId) }
    });
  }

  // --- Pagination ---
  if (page && limit) {
    pipeline.push(
      { $skip: (page - 1) * limit },
      { $limit: limit }
    );
  }

  return pipeline;
};


  



