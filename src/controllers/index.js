import { createAstrologer, getAstrologer, profileAstrologer, updateAstrologerProfile, toggleAvailability} from "../controllers/astrologerController.js"
import {createAstrologerServices, getAstrologerServices, updatedAstrologerServices, deletedAstrologerServices } from '../controllers/astrologerServiceController.js'
import {registerUsers, getUsers, loginUsers, profileUser, updateUser} from "../controllers/authController.js"
import {createBooking, getBookings, getAstrologerBookings, updateBookingStatus} from '../controllers/bookingController.js'
import {getUserKundlis,generateKundli} from '../controllers/kundaliController.js'
import {getUserDashboard} from '../controllers/userDashboardController.js'
import {createCountry, getCountry, updateCountry, deleteCountry} from '../controllers/countryController.js'
import {createState, getStates, updatedState, deleteStates} from '../controllers/stateController.js'
import { createCity, getCity } from "./cityController.js"
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
    profileUser: profileUser,
    updateUser : updateUser
}

// bookingController
export const bookingController = {
    createBooking: createBooking,
    getBookings: getBookings,
    getAstrologerBookings: getAstrologerBookings,
    updateBookingStatus: updateBookingStatus,
}

// kundaliController
export const kundaliController = {
    generateKundli: generateKundli,
    getUserKundlis: getUserKundlis
}

export const userDashboardController = {
    getUserDashboard : getUserDashboard
}

export const countryController = {
    createCountry : createCountry,
    getCountry : getCountry,
    updateCountry : updateCountry,
    deleteCountry : deleteCountry
}

export const stateController = {
    createState : createState,
    getStates : getStates,
    updatedState : updatedState,
    deleteStates : deleteStates
}

export const cityController = {
    createCity : createCity,
    getCity : getCity
}