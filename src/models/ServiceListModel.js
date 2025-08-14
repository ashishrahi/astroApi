import mongoose from "mongoose";

const serviceListSchema = new mongoose.Schema(
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

const ServiceList = mongoose.model(
  "ServiceList",
  serviceListSchema
);

export default ServiceList;
