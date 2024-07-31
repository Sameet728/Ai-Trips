import axios from 'axios';

// Make sure to replace 'YOUR_ACCESS_KEY' with your actual Unsplash API key
const UNSPLASH_ACCESS_KEY = import.meta.env.UNSLPASH_ACCESSKEY;
const UNSPLASH_API_URL = import.meta.env.VITE_UNSLPASH_API;

export const fetchPhotos = async (query) => {
  const url = `${UNSPLASH_API_URL}?query=${query}&per_page=12`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data.results; // Return the photos data directly
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request data:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    return []; // Return an empty array in case of an error
  }
};
