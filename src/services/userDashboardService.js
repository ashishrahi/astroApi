import mongoose from "mongoose";
import Booking from "../models/bookingModel.js";
import { authenticationRepository } from "../repository/userRepository.js";
import { bookingRepository } from "../repository/bookingRepository.js";
import { walletRepository } from "../repository/walletRepository.js";

export const getDashboarUserService = async (payload ={}) => {
  try {
    const { id } = payload;

    // Fetch recent consultations (limit to 5)
    const consultations = await bookingRepository.findBookingById({ userId: id })
      .populate("astrologerId", "name")
      .sort({ date: -1 })
      .limit(5);

    // Fetch wallet transactions (limit to 5)
    const wallet = await walletRepository.findWalletById({ userId: id }).sort({ date: -1 }).limit(5);

    // Fetch user profile
    const user = await authenticationRepository.findUserById(id).select("-password");

    //  total consultation
    const totalConsultations = await bookingRepository.countBooking({ userId: id });
    //  average rating
    const averageRating = await bookingRepository.averageRating(payload);
    //  total minutes
    const totalMinutes = await bookingRepository.averageRating(payload)

    // Send combined response
    return {
      success: true,
      message: "dashboard data",
      data: {
        profile: user,
        consultations,
        wallet,
        stats: {
          totalConsultations,
          avgRating: averageRating[0]?.avg || 0,
          totalHours: ((totalMinutes[0]?.totalMinutes || 0) / 60).toFixed(1),
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
