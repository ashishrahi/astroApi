import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
          },
  type: { 
     type: String, 
     enum: ["recharge", "consultation"],
     default:null 
        },
  amount: { 
     type: Number, 
     default:null 
          },
  date: { 
     type: Date, 
     default: Date.now 
        },
  status: { 
      type: String, 
      enum: ["success", "failed"], 
      default: "success" 
          }
});

const Wallet = mongoose.model("Wallet", walletTransactionSchema);

export default Wallet
