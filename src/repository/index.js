import { CreateServiceListQuery, GetServiceListQuery, updateListQuery, deleteServiceQuery } from "../repository/serviceListRepository.js"
import { reviewCreateQuery, reviewGetQuery } from "../repository/reviewRepository.js"
import {createWallet, getListWallet, updateWallet} from '../repository/walletRepository.js'

export const serviceListRepository = {
    CreateServiceListQuery :CreateServiceListQuery,
    GetServiceListQuery: GetServiceListQuery,
    updateListQuery: updateListQuery,
    deleteServiceQuery : deleteServiceQuery
}
export const reviewRepository = {
    reviewCreateQuery : reviewCreateQuery,
    reviewGetQuery : reviewGetQuery
}

export const walletRepository = {
    createWallet : createWallet,
    getListWallet: getListWallet,
    updateWallet : updateWallet
}