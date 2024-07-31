import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Infosection from '../components/Infosection';
import Hotels from '../components/Hotels';
import PlacestoVisit from '../components/PlacestoVisit';
import { fetchPhotos } from '@/service/GlobalApi';


function ViewTrip() {
  const {tripId}=useParams();
const [trip,setTrip]=useState([]);
useEffect(()=>{
  tripId&&GetTripData();
},[tripId]);

  const GetTripData=async()=>{
    const DocRef=doc(db,"AiTrips",tripId);
    const DocSnap=await getDoc(DocRef);
    if(DocSnap.exists()){
      console.log(DocSnap.data());
      setTrip(DocSnap.data());
    }else{
      console.log("non such doc");
      toast("non such doc");
    }
  };

 
  return (
    <div className='p-10 md:px-20 lg:px-40 xl:px-56'>
<Infosection trip={trip}/>
<Hotels trip={trip}/>
<PlacestoVisit trip={trip}/>
    </div>
  )
}

export default ViewTrip