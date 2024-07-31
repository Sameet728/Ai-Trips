// src/CreateTrip.js

import React, { useEffect, useState } from 'react';
import MyAddressForm from '@/components/ui/MyAddressForm';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import { AiOutlineLoading } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';



function CreateTrip() {
  // State to store the selected city name
  const [city, setCity] = useState('');

  // Callback function to handle city change
  const handleCityChange = (selectedCity) => {
    // setCity(selectedCity);
    handleInputChange('location', selectedCity)
  };


  const [formdata, setFormData] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formdata, [name]: value
    })

  };

  useEffect(() => {
    if(formdata?.noofdays > 5){
toast("Enter days Less than 5");  
    }else{
    console.log(formdata);
    }
  }, [formdata]);

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>{console.log(codeResp.access_token
    ),Getuserprofile(codeResp.access_token
    )},
    onError:(error) =>console.log(error)
    
  });


  const Getuserprofile=async(tokenInfo)=>{
    await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo}`
    ,{
        headers:{
 Authorization: `Bearer ${tokenInfo?.access_token}`,
  Accept: 'Application/json'
        }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setopenDialog(false);
      toast("Logged in Sucessfully")
      onGenerateTrip();
    })
  }

  const onGenerateTrip = async () => {
    if (formdata?.noofdays > 5 || !formdata?.location || !formdata?.budget || !formdata?.travler){
      toast("Please fill all Valid details")

      return;
    }else{

    const user = localStorage.getItem('user');
    if (!user) {
      setopenDialog(true);
      return;
    }

  
    setloading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formdata?.location)
      .replace('{totaldays}', formdata?.noofdays)
      .replace('{totaldayss}', formdata?.noofdays)
      .replace('{traveler}', formdata?.travler)
      .replace('{budget}', formdata?.budget);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setloading(false); 
    SaveAiTrip(result.response.text());
  }
  }

const SaveAiTrip=async(Tripdata)=>{
  setloading(true)
  const user=JSON.parse(localStorage.getItem('user'));
  const docId=Date.now().toString();
  await setDoc(doc(db, "AiTrips", docId), {
    userSelection:formdata,
    tripdata:JSON.parse(Tripdata),
    userEmail:user?.email,
    id:docId
  });
  setloading(false);
  navigate('/view-trip/'+docId);
}

  return (
    <div className="container sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Destination Choice?</h2>
          {/* Pass the callback function as a prop */}
          <div>
            <Input className="my-2 text-xl font-medium text-gray-950" disabled value={formdata?.location}></Input>
             <MyAddressForm onCityChange={handleCityChange} /></div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number" onChange={(e) => handleInputChange('noofdays', e.target.value)} />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className='grid xl:grid-cols-3 gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1 '>
            {SelectBudgetOptions.map((item, index) => {
              return (<div key={index} onClick={() => handleInputChange('budget', item.title)} className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formdata?.budget == item?.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
              )
            })}
          </div>
        </div>


        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 mt-5'>
            {SelectTravelersList.map((item, index) => {
              return (<div key={index} onClick={() => handleInputChange('travler', item.people)} className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formdata?.travler == item?.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
              )
            })}
          </div>
        </div>

        <div className='my-5 flex justify-end'>
          <Button onClick={onGenerateTrip}>{loading ?<AiOutlineLoading  className="w-7 h-7 animate-spin"/> :" Generate Trip"}</Button>
        </div>
        <Dialog open={openDialog}>
          
          <DialogContent>
            <DialogHeader>
             <DialogTitle/>
              <DialogDescription>
               <img src="/logo.svg" alt="" /> 
               <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
               <p>Sign in to the App with Google authentication safely.</p>
               <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"> <FcGoogle className='h-7 w-7' /> Sign In With Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
    </div>
  );
}

export default CreateTrip;
