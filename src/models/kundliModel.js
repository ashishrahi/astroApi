import mongoose from "mongoose";

const kundliSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  gender: String,
  dob: String,
  tob: String,
  lat: Number,
  lon: Number,
  timezone: String,
  kundliData: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const Kundli = mongoose.model('Kundli', kundliSchema);

export default Kundli