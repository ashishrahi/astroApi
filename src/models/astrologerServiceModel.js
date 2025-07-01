import mongoose from "mongoose";

const astrologerServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    basePrice: { type: Number },
    durationInMinutes: { type: Number },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const AstrologerService = mongoose.model(
  "AstrologerService",
  astrologerServiceSchema
);

export default AstrologerService;
