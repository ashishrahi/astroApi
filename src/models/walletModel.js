import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
          },
  type: { 
     type: String, 
     enum: ["credit", "consultation"],
     default:null 
        },
  amount: { 
     type: Number, 
     default:0
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
