import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", required: true
            },
    title: {
            type: String
          },
    message: { 
             type: String
             },
    type: { 
            type: String, 
            enum: ["push", "toast"], 
            default: "push"
         },
    read: { 
            type: Boolean, 
            default: false
         },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
