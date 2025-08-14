import { createAstrologer, getAstrologer, profileAstrologer, updateAstrologer, toggleAvailability, deleteAstrologers} from "../controllers/astrologerController.js"
import {createAstrologerServicesList, getAstrologerServicesList, updatedAstrologerServicesList, deletedAstrologerServicesList } from '../controllers/astrologerServiceController.js'
import {registerUsers, getUsers, loginUsers, updateUser,refreshTokenHandler} from "../controllers/authController.js"
import {createBooking, getBookings, updateBooking} from '../controllers/bookingController.js'
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
    updateAstrologer: updateAstrologer,
    toggleAvailability: toggleAvailability,
    deleteAstrologers : deleteAstrologers
}

//  astrologerServiceController
export const astrologerServiceController = { 
    createAstrologerServicesList: createAstrologerServicesList,
    getAstrologerServicesList: getAstrologerServicesList,
    updatedAstrologerServicesList: updatedAstrologerServicesList,
    deletedAstrologerServicesList: deletedAstrologerServicesList
}

// userAuthentication
export const authenticationController = {
    registerUsers : registerUsers,
    getUsers: getUsers,
    loginUsers: loginUsers,
    updateUser : updateUser,
    refreshTokenHandler: refreshTokenHandler
}

// bookingController
export const bookingController = {
    createBooking: createBooking,
    getBookings: getBookings,
    updateBooking: updateBooking,
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