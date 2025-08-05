import mongoose from "mongoose";
const chatRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  astrologerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Astrologer",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
