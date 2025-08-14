import Astrologer from "../models/astrologerModel.js";
import Booking from "../models/bookingModel.js";
import { notifyUser } from "../services/notificationService.js";
import { ChatRoom } from "../models/ChatRoom.js";
import { BookingListQuery } from "../repository/bookingRepository.js";

export const createBooking = async (model) => {
  try {
    const booking = new Booking({ ...model });

    const astrologer = await Astrologer.findById(booking.astrologerId).select(
     "name"
    );

    // Generate roomId based on booking ID
    const roomId = `booking_${booking._id}`;

    // ✅ Save roomId to booking
    booking.roomId = roomId;

    // Create chat room
    await ChatRoom.create({
      roomId,
      bookingId: booking._id,
      userId: booking.userId,
      astrologerId: booking.astrologerId,
    });

    // Notify user
    await notifyUser({
      userId: booking.userId,
      title: "Consultation Booked",
      message: `Your consultation with astrologer is confirmed.`,
      type: "push",
    });
    // Save the booking (after adding roomId)
    await booking.save();

    return {
      success: true,
      message: "booking created successfully",
      data: booking,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getBookingService = async (model) => {
  try {
    const bookingList = await BookingListQuery(model);
    return {
      success: true,
      message: "list of booking",
      data: bookingList,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};



export const updateBooking = async (id, payload) => {
  try {
    const {status, paymentStatus} = payload;
    const booking = await Booking.findById(id);
    if (!booking) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    // Update fields only if provided
    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();

    return {
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    };
  } catch (error) {
    console.error("Service Error in updateBookingStatus:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
