import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["recharge", "consultation"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["success", "failed"], default: "success" }
});
  
const Wallet = mongoose.model("Wallet", walletTransactionSchema);

export default Wallet
