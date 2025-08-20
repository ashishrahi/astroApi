import Wallet from "../models/walletModel.js";
import {WalletPipeline} from '../Pipeline/walletPipleline.js'

// create
export const createWallet = async({user ,amount = 0})=>{
try {
    const newWallet = new Wallet({user, amount})
    const savedWallet = await newWallet.save()
    return savedWallet
} catch (error) {
    throw error;
}}
// get
export const getListWallet = async( payload)=>{
    try {
        const listWallet = await WalletPipeline(payload)
        return listWallet
    } catch (error) {
        throw new Error(error.message)
    }
}
// update
export const updateWallet = async (id, payload) => {
  try {
   
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

    return { success: true,message:"updated successfully" ,data: updatedWallet };
  } catch (error) {
    return { success: false, message: error.message };
  }
};