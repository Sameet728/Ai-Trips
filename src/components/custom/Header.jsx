import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
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



function Header() {
  let user=JSON.parse(localStorage.getItem("user"));
  const [openDialog, setopenDialog] = useState(false);

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

  useEffect(()=>{
    console.log(user);
    
  },[])
  return (
    <div className='p-3 container  shadow-sm flex justify-between items-center px-5'>
     <a href="/"> <img src="/logo.svg" alt="" /></a>
      <div>
        <div>
          {user 
          ?
           <div className='flex gap-6'>
           

            <a href="/my-trips">
<Button variant="outline" className="rounded-full">MyTrips</Button></a>
<Popover>
  <PopoverTrigger><img src={user?.picture} alt=""  className='h-[35px] w-[35px] xl:mr-8 sm:mr-2 rounded-full cursor-pointer'/></PopoverTrigger>
  <PopoverContent className="cursor-pointer ">
  <a href="/create-trip"> <h1>+ Create Trip</h1></a>
  <br /><h2  onClick={()=>{
    googleLogout();
    localStorage.clear();
    window.location.reload();
  }}>Logout</h2>
 
  </PopoverContent>
 
</Popover>

          </div>
            :
            <div>
            <Button onClick={()=>{setopenDialog(!openDialog)}} >Sign In</Button>
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
          </div>  }
        </div>
        
      </div>
    </div>
  )
}

export default Header