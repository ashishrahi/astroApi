import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    astrologer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
      // required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    consultationType: {
      type: String,
    },
    date: {
      type: Date,
      //  required: true
    },
    time: {
      type: String,
      // required: true
    },
    purpose: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid","refunded"],
      default: "unpaid",
    },
    duration: {
      type: String,
    },
    cost: {
      type: String,
    },
  },
  { timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
