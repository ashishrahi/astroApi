import mongoose from "mongoose";

const astrologerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expertise: [String],
    language: [String],
    email: {
      type: String,
      unique: true,
    },
    phone: String,
    profileImage: String,
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
const Astrologer = mongoose.model("Astrologer", astrologerSchema);

export default Astrologer;
