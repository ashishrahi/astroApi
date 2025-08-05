import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
    },
  },
  { timestamps: true }
);
const Country = mongoose.model("Country", countrySchema);

export default Country;
