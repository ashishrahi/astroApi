import axios from "axios";
import Kundli from "../models/kundliModel.js";
import { getProkeralaToken } from "../utilities/prokeralaAuth.js";
import User from "../models/userModel.js";
import { authenticationRepository, kundaliRepository } from "../repository/index.js";
import { getTimezoneOffsetString } from "../utilities/getTimezoneOffsetString.js";

export const generateKundaliService = async (payload) => {
  try {
    const {
      name,
      gender,
      dob,
      tob,
      lat = "26.4499",
      lon = "80.3319",
      timezone = "Asia/Kolkata",
      userId,
    } = payload;

    const token = await getProkeralaToken();

    // Format: 1995-12-15T09:30:00+05:30
    const datetimeISO = `${dob}T${tob}:00${getTimezoneOffsetString(timezone)}`;

    const response = await axios.get(
      "https://api.prokerala.com/v2/astrology/birth-details",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          datetime: datetimeISO,
          coordinates: `${lat},${lon}`,
          timezone: timezone,
          ayanamsa: 1, // Lahiri
        },
      }
    );
    //

    await authenticationRepository.updateUser( userId, payload);
    //
    const savedKundli = await Kundli.create({
      userId,
      name,
      gender,
      dateOfBirth: dob,
      timeOfBirth: tob,
      latitude: lat,
      longitude: lon,
      timeZone: timezone,
      kundliData: response.data,
    });
    // update user

    return {
      success: true,
      message: "Kundli generated & saved",
      data: savedKundli,
    };
  } catch (error) {
    console.error(
      "🔴 Prokerala API Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};


export const getUserKundlisService = async (payload) => {
  try {
    //kundali
    const kundaliList = await kundaliRepository.getKundali(payload);

    return {
      success: true,
      message: "Daily horoscope fetched & saved successfully",
      data: kundaliList,
    };
  } catch (error) {
    console.error(
      "🔴 Prokerala API Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
