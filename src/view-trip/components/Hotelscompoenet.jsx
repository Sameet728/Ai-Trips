import { fetchPhotos } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hotel({ hotel }) {
  const [photos, setPhotos] = useState([]);

  // useEffect(() => {
  //   const getPhotos = async () => {
  //     if (hotel?.hotelName) {
  //       try {
  //         const fetchedPhotos = await fetchPhotos(`${hotel?.hotelName},${hotel?.hotelAddress}`);
  //         setPhotos(fetchedPhotos);
  //       } catch (error) {
  //         console.error('Error fetching photos:', error);
  //       }
  //     }
  //   };

  //   getPhotos();
  // }, [hotel]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className='my-2 flex-col gap-2 flex hover:scale-105 cursor-pointer transition-all '>
        <img src={photos[0]?.urls?.small || "/placeholder.jpg"} alt={hotel?.hotelName} className='rounded-lg' />
        <h2 className='font-medium'>{hotel?.hotelName}</h2>
        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
        <h2 className='text-sm'>💰 {hotel?.price}</h2>
        <h2 className=''>⭐ {hotel?.rating}</h2>
      </div>
    </Link>
  );
}

export default Hotel;

