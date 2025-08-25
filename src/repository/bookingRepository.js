import Booking from "../models/bookingModel.js";
import { bookingListPipeline } from "../Pipeline/bookingPipeline.js";
import { chatRepository } from "./chatRoomRepository.js";

export const bookingRepository = {
  // create
  createBooking: async (payload) => {
    const newbooking = new Booking(payload);
     const roomId = `booking_${newbooking._id}`;
      // Create chat room
         await chatRepository.createRoom({
           roomId ,
           bookingId: newbooking._id,
           userId: newbooking.userId,
           astrologerId: newbooking.astrologerId,
         });
     newbooking.roomId = roomId;

    const savedBooking = await newbooking.save();
    return savedBooking;
  },

  // avgRating
  averageRating: async (payload) => {
    const { userId } = payload;

    const result = await Booking.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          rating: { $exists: true },
        },
      },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    // Return average or 0 if no ratings
    return result.length > 0 ? result[0].avg : 0;
  },

  // countBooking
  countBooking: async ({ userId: id }) => {
    const countBooking = await Booking.countDocuments({ userId: id });
    return countBooking;
  },

  //  findbyId
  findBookingById: async (id) => {
    const existBooking = await Booking.findById(id);
    return existBooking;
  },

  // get
  getBookingList: async (payload) => {
    const { status = "pending", search = "", page = 1, limit = 5 } = payload;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const bookingAggregate = await Booking.aggregate(
      bookingListPipeline({ status, search }, skip, limitNumber)
    );
    return bookingAggregate;
  },

  // delete
  updateBooking: async (id, payload) => {
    const { status, paymentStatus } = payload;
    const bookingUpdated = await bookingRepository.findBookingById(id);
    if (!bookingUpdated) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    // Update fields only if provided
    if (status) bookingUpdated.status = status;
    if (paymentStatus) bookingUpdated.paymentStatus = paymentStatus;

    await bookingUpdated.save();
  },
};
