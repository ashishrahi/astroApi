import mongoose from "mongoose";

const kundliSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
       type: String
        },
  gender: {
         type:String
        },
  dateOfBirth: {
        type: String
      },
  timeOfBirth: {
        type: String
      },
  latitude: {
        type:Number
      },
  longitude: {
       type:Number
      },
  timeZone: {
        type: String
      },
  kundliData: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const Kundli = mongoose.model('Kundli', kundliSchema);

export default Kundli