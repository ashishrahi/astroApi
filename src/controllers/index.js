import { createAstrologer, getAstrologer, profileAstrologer, updateAstrologerProfile, toggleAvailability} from "../controllers/astrologerController.js"
import {createAstrologerServices, getAstrologerServices, updatedAstrologerServices, deletedAstrologerServices } from '../controllers/astrologerServiceController.js'
import {registerUsers, getUsers, loginUsers, profileUser} from "../controllers/authController.js"
import {createBooking, getUserBookings, getAstrologerBookings, updateBookingStatus} from '../controllers/bookingController.js'
import {getUserKundlis,generateKundli} from '../controllers/kundaliController.js'
import {getUserDashboard} from '..//controllers/userDashboardController.js'

//  astrologerController

export const astrologerController = {
    createAstrologer: createAstrologer,
    getAstrologer: getAstrologer,
    profileAstrologer: profileAstrologer,
    updateAstrologerProfile: updateAstrologerProfile,
    toggleAvailability: toggleAvailability,
}

//  astrologerServiceController

export const astrologerServiceController = { 
    createAstrologerServices: createAstrologerServices,
    getAstrologerServices: getAstrologerServices,
    updatedAstrologerServices: updatedAstrologerServices,
    deletedAstrologerServices: deletedAstrologerServices
}

// userAuthentication

export const authenticationController = {
    registerUsers : registerUsers,
    getUsers: getUsers,
    loginUsers: loginUsers,
    profileUser: profileUser
}

// bookingController

export const bookingController = {
    createBooking: createBooking,
    getUserBookings: getUserBookings,
    getAstrologerBookings: getAstrologerBookings,
    updateBookingStatus: updateBookingStatus,
}

// kundaliController

export const kundaliController = {
    generateKundli: generateKundli,
    getUserKundlis: getUserKundlis
}

export const userDashboardController ={
    getUserDashboard : getUserDashboard
}

