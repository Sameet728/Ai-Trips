import React from 'react';
import Hotel from './Hotelscompoenet';


function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
      <div className='mt-3'>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {trip?.tripdata?.hotels?.map((hotel, index) => (
            <Hotel key={index} hotel={hotel} />
           
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
