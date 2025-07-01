import axios from 'axios';
import Kundli from '../models/kundliModel.js';
import { getProkeralaToken } from '../utilities/prokeralaAuth.js';

export const generateKundaliService = async (model) => {
  try {
    const { name, gender, dob, tob, lat, lon, timezone } = model;

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

    const savedKundli = await Kundli.create({
      name,
      gender,
      dob,
      tob,
      lat,
      lon,
      timezone,
      kundliData: response.data
    });

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


export const getUserKundlisService =(req, res)=>{
    try {
        
    } catch (error) {
        
    }
}