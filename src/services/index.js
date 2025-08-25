import {createAstrologerService, getAstrologerService, updateAstrologerService, deleteService} from '../services/astrologerService.js'
import {RegisterUserService, UserListService, LoginUserService,  updateUserService, refreshTokenHandlerService } from '../services/authenticationService.js'
import {createBooking, getBookingService,  updateBooking} from '../services/bookingService.js'
import {generateKundaliService, getUserKundlisService} from '../services/KundaliService.js'
import {getDashboarUserService} from '../services/userDashboardService.js'
import {createCountryService, getCountryService, updateCountryService, deleteCountryService} from '../services/countryService.js'
import {createStateService, getStateService, updatedStateService, deleteStateService} from '../services/stateService.js'
import {createcityService, getCityService, updateCityService} from '../services/cityService.js'
import { createServiceList, getServiceList, updateServiceList, deleteServiceList } from './ServiceListService.js'
import { createReviewService, getReviewService} from './reviewService.js'
import {createWalletService, getWalletService, updateWalletService} from './walletService.js'
import {createNotificationService} from './notificationService.js'



// astrologer services
export const astrologerService = {

    createAstrologerService: createAstrologerService,
    getAstrologerService: getAstrologerService,
    updateAstrologerService: updateAstrologerService,
    deleteService: deleteService
}

// authentication services
export const authenticationService = {

    RegisterUserService: RegisterUserService,
    UserListService: UserListService,
    LoginUserService: LoginUserService,
    updateUserService: updateUserService,
    refreshTokenHandlerService : refreshTokenHandlerService
}

// booking services
export const bookingServices = {

    createBooking: createBooking,
    getBookingService: getBookingService,
    updateBooking: updateBooking
}

// Kundali services
export const KundaliService ={

    generateKundaliService:generateKundaliService, 
    getUserKundlisService: getUserKundlisService
}

// dashboard services 
export const userDashboardService ={
    
    getDashboarUserService:getDashboarUserService, 
}

// country services
export const countryService = {
    createCountryService : createCountryService,
    getCountryService : getCountryService,
    updateCountryService : updateCountryService,
    deleteCountryService : deleteCountryService
}

export const stateService = {
    createStateService : createStateService,
    getStateService : getStateService,
    updatedStateService : updatedStateService,
    deleteStateService : deleteStateService
}

export const cityService = {
   createcityService : createcityService,
   getCityService : getCityService,
   updateCityService : updateCityService
}

export const astrologerServiceListService = {
    createServiceList: createServiceList,
    getServiceList: getServiceList,
    updateServiceList : updateServiceList,
    deleteServiceList : deleteServiceList
}

export const reviewService = {
    createReviewService : createReviewService,
    getReviewService : getReviewService
}

export const walletService = {
    createWalletService : createWalletService,
    getWalletService : getWalletService,
    updateWalletService : updateWalletService
}

export const notificationService = {
   createNotificationService : createNotificationService 
}
