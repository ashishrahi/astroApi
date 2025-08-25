import Wallet from "../models/walletModel.js";
import {WalletPipeline} from '../Pipeline/walletPipleline.js'


export const walletRepository = {
  // create
  createWallet: async({user, amount = 0})=>{
    const newWallet = new Wallet({user, amount})
    const savedWallet = newWallet.save();
    return savedWallet;
  },
  // get
  getWallet: async(payload)=>{
    const listWallet = await Wallet.aggregate(WalletPipeline(payload))
      return listWallet
  },

  // find wallet repository
  findWalletById: async(payload)=>{
   const walletExist = await Wallet.findById({ userId: id})
   return walletExist;
  },

  // update
  updateWallet: async(id, payload)=>{
     const updateData = {};
    if (payload.type) updateData.type = payload.type;
    if (payload.status) updateData.status = payload.status;
    if (payload.amount) updateData.amount = Number(payload.amount); 

    const updatedWallet = await Wallet.findByIdAndUpdate(
      id,
      { $inc: {amount:updateData.amount}},
      { new: true, runValidators: true } 
    );

    if (!updatedWallet) {
      throw new Error("Wallet not found");
    }

    return  updatedWallet
  }
}

