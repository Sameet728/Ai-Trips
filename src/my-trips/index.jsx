import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import Mytripscomponenet from './components/Mytripscomponenet';

function Mytrips() {
  const navigation=useNavigation();
  const [usertrips,setUserTrips]=useState([]);
    useEffect(()=>{
GettripsData();

  },[])
  const GettripsData=async()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    
    if(!user){
      navigation('/');
      return ;
    }
    setUserTrips([]);
    const q=query(collection(db,"AiTrips"),where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q) ;
querySnapshot.forEach ( (doc) => {
// doc.data() is never undefined for query doc snapshots
    console.log( doc.data());
    setUserTrips (prevVal=>[ ... prevVal, doc.data()])
    
});
  }
  return (
    <div className='container sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-lg my-3'>My Trips <span className='font-medium text-gray-500'>- {usertrips?.length}</span> </h2>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        {usertrips?.length>0
        ?
        usertrips?.map((trip,index)=>{
          return (
            <div key={index} className='m-5 hover:scale-105 transition-all cursor-pointer'>
<Mytripscomponenet trip={trip}/>
            </div>
          )
        }):
        [1,2,3,4,5,6].map((item,index)=>{
        return(  <div key={index} className='grid grid-cols-3 gap-5' >
<div className='h-[250px] w-[370px] bg-slate-200 animate-pulse rounded-lg m-5 '></div>
          </div>)
        })
                }

      
      </div>
    </div>
  )
}

export default Mytrips