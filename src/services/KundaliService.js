import axios from 'axios';
import Kundli from '../models/kundliModel.js';
import { getProkeralaToken } from '../utilities/prokeralaAuth.js';
import User from '../models/userModel.js';

export const generateKundaliService = async (model) => {
  try {
  const { name, gender, dob, tob, lat = "26.4499", lon = "80.3319", timezone = "Asia/Kolkata",userId } = model;
  console.log('model', model)


    const token = await getProkeralaToken();

    // Format: 1995-12-15T09:30:00+05:30
    const datetimeISO = `${dob}T${tob}:00${getTimezoneOffsetString(timezone)}`;

    const response = await axios.get(
      'https://api.prokerala.com/v2/astrology/birth-details',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          datetime: datetimeISO,
          coordinates: `${lat},${lon}`,
          timezone: timezone,
          ayanamsa: 1 // Lahiri
        }
      }
    );
 await User.findByIdAndUpdate(userId,{$set:{
    birthDate: dob,
    birthTime: tob,
    birthPlace: "Kanpur",
    
 }},{ new: true })
    const savedKundli = await Kundli.create({
      name,
      gender,
      dateOfBirth:dob,
      timeOfBirth:tob,
      latitude:lat,
      longitude : lon,
      timeZone:timezone,
      kundliData: response.data
    });
// update user


    return {
      success: true,
      message: 'Kundli generated & saved',
      data: savedKundli
    };
  } catch (error) {
    console.error('🔴 Prokerala API Error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};

// Utility to convert timezone name to offset like +05:30
function getTimezoneOffsetString(timezone) {
  const offsetMap = {
    'Asia/Kolkata': '+05:30'
    // Add others if needed
  };
  return offsetMap[timezone] || '+05:30'; // fallback
}


export const getUserKundlisService = async(model)=>{
   try {
const kundaliList = await Kundli.find()
    

    return {
      success: true,
      message: 'Daily horoscope fetched & saved successfully',
      data: kundaliList
    };
  } catch (error) {
    console.error('🔴 Prokerala API Error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
}