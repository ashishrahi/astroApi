import Wallet from "../models/walletModel.js";

import mongoose from "mongoose";


export const WalletPipeline = async (payload = {}) => {
  try {
    const { page, limit, search = "", userId } = payload;

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
            { name: { $regex: search, $options: "i" } },
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

    // --- Pagination (sirf tab jab page aur limit diye ho) ---
    if (page && limit) {
      pipeline.push(
        { $skip: (page - 1) * limit },
        { $limit: limit }
      );
    }

    const listWallet = await Wallet.aggregate(pipeline);
    return { success: true, data: listWallet };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


