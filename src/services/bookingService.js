import Astrologer from "../models/astrologerModel.js";
import Booking from "../models/bookingModel.js"
import { notifyUser } from "../services/notificationService.js";
import { ChatRoom } from "../models/ChatRoom.js";

export const createBooking = async (model) => {
  try {
    const booking = new Booking({ ...model });

    const astrologer = await Astrologer.findById(booking.astrologer).select("name");

    // Generate roomId based on booking ID
    const roomId = `booking_${booking._id}`;

    // ✅ Save roomId to booking
    booking.roomId = roomId;

    // Create chat room
    await ChatRoom.create({
      roomId,
      bookingId: booking._id,
      userId: booking.user,
      astrologerId: booking.astrologer,
    });

    // Notify user
    await notifyUser({
      user: booking.user,
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

export const getUserBookings = (model) =>{
    try {
        const model = req.params
    } catch (error) {
        
    }

}
 
export const getAstrologerBookings = async(model)=>{
    try {
        const {id} = model
        const bookings = await Booking.find({astrologer:id}).populate([ 
            { path: "user", select: "name email" },
            { path: "astrologer", select: "name rating" }])

        return{
            success: true,
            message: 'astrologer bookings',
            data: bookings
              }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }

}

export const updateBookingStatus = async ({ id, status, paymentStatus }) => {
  try {

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