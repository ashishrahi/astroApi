import {walletRepository} from '../repository/index.js'

// create
export const createWalletService = async(payload)=>{
    try {
        const result = await walletRepository.createWallet(payload);
        return result
    } catch (error) {
      throw new Error(error.message)        
    }
}
// get
export const getWalletService = async(payload)=>{
    try {
        const result = await walletRepository.getListWallet(payload)
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}
// update
export const updateWalletService = async(id, payload)=>{
     try {
        const {success, message, result} = await walletRepository.updateWallet(id, payload)
        return {
            success,
            message,
            data: result
        }
    } catch (error) {
        throw new Error(error.message)
    }
}