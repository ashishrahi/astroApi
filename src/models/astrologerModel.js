import mongoose from "mongoose";

const astrologerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image:{
      type: String,
    },
    specialties: [String],
    languages: [String],
    email: {
      type: String,
    },
    chatRate: {
      type: Number
    },
    callRate:{
      type: Number
    },
    videoRate:{
      type: Number,
    },
    experience:{
      type: Number,
    },
    isOnline: { type: String, enum: ["active", "inactive"], default: "active" },
    phone: {
             type: String
            },
    rating: { type: Number, default: 0 },
   status: {
    type: String,
    default: true,
       },
  },
  { timestamps: true }
);
const Astrologer = mongoose.model("Astrologer", astrologerSchema);

export default Astrologer;
