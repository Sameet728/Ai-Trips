import React from 'react'
import { Link } from 'react-router-dom'

function Mytripscomponenet({trip}) {
  return (
    <Link to={'/view-trip/'+ trip?.id}>
    <div className=''>
      <div>
        <img src="/placeholder.jpg" alt="" className=' w-[370px] rounded-lg'/></div>
      <div>
<h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
<h2 className='text-sm text-gray-500'>{trip?.userSelection?.noofdays} Days Trip with <span className='font-bold text-neutral-800'> {trip?.userSelection?.budget} </span>Budget</h2>
      </div>

    </div>

    </Link>
  )
}

export default Mytripscomponenet