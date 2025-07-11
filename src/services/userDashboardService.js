import mongoose from "mongoose";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";

export const getDashboarUserService = async (model) => {
  try {
    const { id } = model;
    console.log('userId:',id)

    // Fetch recent consultations (limit to 5)
    const consultations = await Booking.find({ user: id })
      .populate("astrologer", "name")
      .sort({ date: -1 })
      .limit(5);

    // Fetch wallet transactions (limit to 5)
    const wallet = await Wallet.find({ user: id })
      .sort({ date: -1 })
      .limit(5);

    // Fetch user profile
    const user = await User.findById(id).select("-password");

    // Compute dashboard stats
    const totalConsultations = await Booking.countDocuments({ user: id });

    const averageRating = await Booking.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(id), rating: { $exists: true } } },
      { $group: { _id: null, avg: { $avg: "$rating" } } }
    ]);

    const totalMinutes = await Booking.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          totalMinutes: {
            $sum: {
              $toInt: {
                $arrayElemAt: [{ $split: ["$duration", " "] }, 0]
              }
            }
          }
        }
      }
    ]);

    // Send combined response
    return {
      success: true,
      message: "dashboard data",
      data:{
      profile: user,
      consultations,
      wallet,
      stats: {
        totalConsultations,
        avgRating: averageRating[0]?.avg || 0,
        totalHours: ((totalMinutes[0]?.totalMinutes || 0) / 60).toFixed(1)
      }}
      
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};
