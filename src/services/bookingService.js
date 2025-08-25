import { notifyUser } from "../services/notificationService.js";
import { astrologerRepository, bookingRepository, chatRepository } from "../repository/index.js";


export const createBooking = async (payload) => {
  try {
    // checking booking
    const savedBooking = await bookingRepository.createBooking(payload);

    // checking astrologer
    const astrologerExist = await astrologerRepository.findAstrologerById(payload.astrologerId)
    if (!astrologerExist) {
      return{
        success: true,
        message: "astrologer is not exist ! "
      }
    }

    // Notify user
    await notifyUser({
      userId: payload.userId,
      title: "Consultation Booked",
      message: `Your consultation with astrologer is confirmed.`,
      type: "push",
    });
    

    return {
      success: true,
      message: "booking created successfully",
      data: savedBooking,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getBookingService = async (payload) => {
  try {
    const bookingList = await bookingRepository.getBookingList(payload);
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
    // update booking
    const bookingUpdated = await bookingRepository.updateBooking(id, payload);

    return {
      success: true,
      message: "Booking status updated successfully",
      data: bookingUpdated,
    };
  } catch (error) {
    console.error("Service Error in updateBookingStatus:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
