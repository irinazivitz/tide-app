import axios from 'axios';

export const getTimezone = async(lat, lon) => {
    const timezoneApiKey= 'CMS3MZYV6UWZ';
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching timezone data:", error);
    throw error;
  }
};