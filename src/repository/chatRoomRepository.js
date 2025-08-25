import { ChatRoom } from "../models/ChatRoom.js";

export const chatRepository = {
    // create
  createRoom: async (
    { roomId, bookingId, userId, astrologerId },
    session = null
  ) => {
    return ChatRoom.create([{ roomId, bookingId, userId, astrologerId }], {
      session,
    });
  },


};
