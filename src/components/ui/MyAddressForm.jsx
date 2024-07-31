// src/components/ui/MyAddressForm.js

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

const MyAddressForm = ({ onCityChange }) => {
  const geocoderContainerRef = useRef(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood',
      placeholder: 'Enter your destination...',
      minLength: 3, // Start suggesting after 3 characters
      limit: 5,     // Limit results to 5 suggestions
      proximity: { longitude: -79.3832, latitude: 43.6532 }, // Optional: Toronto example
    });

    geocoder.addTo(geocoderContainerRef.current);

    // Event listener for when a result is selected
    geocoder.on('result', (e) => {
      const selectedPlace = e.result;
      // console.log('Selected result:', selectedPlace);

      // Extract the city name from the selected place
      const city = selectedPlace.place_name;

      // Call the callback function with the city name
      if (onCityChange) {
        onCityChange(city);
      }
    });

    // Clean up the geocoder when the component unmounts
    return () => {
      geocoder.onRemove();
    };
  }, [onCityChange]);

  return (
    <div className=" mx-auto">
      <div className="bg-white border-2 border-neutral-900 rounded-lg p-2">

        <div ref={geocoderContainerRef} id="geocoder" className="geocoder-container">
      
        </div>
      </div>
    </div>
  );
};

export default MyAddressForm;
