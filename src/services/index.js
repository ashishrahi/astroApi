import {createAstrologerService, getAstrologerService, profileService, updateProfileService, toggleAvailabilityService} from '../services/astrologerService.js'
import {RegisterUserService, UserListService, LoginUserService, userProfileService } from '../services/authenticationService.js'
import {createBooking, getUserBookings, getAstrologerBookings, updateBookingStatus} from '../services/bookingService.js'
import {generateKundaliService, getUserKundlisService} from '../services/KundaliService.js'
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
    userProfileService: userProfileService
}

// booking services
export const bookingServices = {
    createBooking: createBooking,
    getUserBookings: getUserBookings,
    getAstrologerBookings: getAstrologerBookings,
    updateBookingStatus: updateBookingStatus
}

export const KundaliService ={
    generateKundaliService:generateKundaliService, 
    getUserKundlisService: getUserKundlisService
}

