import {createAstrologerService, getAstrologerService, profileService, updateProfileService, toggleAvailabilityService} from '../services/astrologerService.js'
import {RegisterUserService, UserListService, LoginUserService, userProfileService, updateUserService } from '../services/authenticationService.js'
import {createBooking, getBookingService, getAstrologerBookings, updateBookingStatus} from '../services/bookingService.js'
import {generateKundaliService, getUserKundlisService} from '../services/KundaliService.js'
import {getDashboarUserService} from '../services/userDashboardService.js'
import {createCountryService, getCountryService, updateCountryService, deleteCountryService} from '../services/countryService.js'
import {createStateService, getStateService, updatedStateService, deleteStateService} from '../services/stateService.js'
import {createcityService, getCityService} from '../services/cityService.js'



// astrologer services
export const astrologerService = {

    createAstrologerService: createAstrologerService,
    getAstrologerService: getAstrologerService,
    profileService: profileService,
    updateProfileService: updateProfileService,
    toggleAvailabilityService: toggleAvailabilityService
}

// authentication services
export const authenticationService = {

    RegisterUserService: RegisterUserService,
    UserListService: UserListService,
    LoginUserService: LoginUserService,
    userProfileService: userProfileService,
    updateUserService: updateUserService
}

// booking services
export const bookingServices = {

    createBooking: createBooking,
    getBookingService: getBookingService,
    getAstrologerBookings: getAstrologerBookings,
    updateBookingStatus: updateBookingStatus
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
   getCityService : getCityService
}