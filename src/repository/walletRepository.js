import Wallet from "../models/walletModel.js";

export const createWallet = async({user ,amount = 0})=>{
try {
    const newWallet = new Wallet({user, amount})
    const savedWallet = await newWallet.save()
    return savedWallet
} catch (error) {
    throw error;
}}