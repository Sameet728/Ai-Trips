import { Button } from '@/components/ui/button'
import React from 'react';
import { IoIosSend } from "react-icons/io";

function Infosection({trip}) {
  return (
    <div>
      <img src="/placeholder.jpg" alt="" className='h-[340px] w-full rounded-xl object-cover' />
      <div className='flex items-center justify-between'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl '>{trip?.userSelection?.location        }</h2>
        <div className='flex gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 text-xs md:text-md rounded-full text-gray-500 text-sm'>📅{trip.userSelection?.noofdays}Day </h2>
          <h2 className='p-1 px-3 bg-gray-200 text-xs md:text-md rounded-full text-gray-500 text-sm'>💰 {trip.userSelection?.travler}Budget </h2>
          <h2 className='p-1 px-3 bg-gray-200 text-xs md:text-md rounded-full text-gray-500 text-sm'>🥂No. Of Traveler:{trip.userSelection?.budget} </h2>
        </div>
      </div>
      <Button><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default Infosection