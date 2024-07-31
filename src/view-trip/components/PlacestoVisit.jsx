import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function PlacestoVisit({ trip }) {

 
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg'>Places to Visit</h2>

      {trip?.tripdata?.itinerary?.map((items, index) => {
        return (
          <div key={index}>
            <h2 className='mt-2 font-medium text-xl '>{items.day}</h2>

            <div className='grid xl:grid-cols-2 gap-5 md:grid-cols-1 sm:grid-cols-1'>{items?.plan?.map((item, indexs) => {
              return (<>
                <div key={indexs}>
                  <h2 className='text-orange-500 font-medium my-2'>{item?.time}</h2>

                  <div className='flex gap-5 border rounded-lg p-3 hover:scale-105 transition-all '>
                    <div>
                      <img src="/placeholder.jpg" alt="" className='h-[130px]  w-[130px] object-cover rounded-lg ' />
                    </div>
                    <div className='flex flex-col justify-evenly w-100% '>
                      <div className='flex justify-between'>
                        <h2 className='font-bold text-lg'>{item?.placeName}</h2>
                        <Link to={'https://www.google.com/maps/search/?api=1&query=' + item?.placeName} target='_blank'><Button><span className='text-xl'>📍</span></Button> </Link>
                      </div>
                      <h2 className='text-gray-500 font-medium'>{item?.placeDetails}</h2>
                      <h2 className='font-medium'>⭐{item?.rating}</h2>
                      <h2 className='font-medium text-gray-600'> 🎟️ &nbsp;{item?.ticketPricing}</h2>
                    </div>
                  </div>

                </div>
              </>
              )
            })}</div>

          </div>
        )
      })}

      <h2 className='mt-7 font-medium text-gray-500 text-center'>Created By Sameet AI Travel Planner App</h2>
    </div>
  )
}

export default PlacestoVisit