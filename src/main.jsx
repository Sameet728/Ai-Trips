import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripid]/index.jsx'
import Mytrips from './my-trips/index.jsx'


const router=createBrowserRouter([
{
  path:"/",
  element:<App/>
},
{
  path:"/create-trip",
  element:<CreateTrip/>
},
{
  path:"/view-trip/:tripId",
  element:<ViewTrip/>

},
{
  path:"/my-trips",
  element:<Mytrips/>
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="103156239353-slfqri66npr8n4abqa5naml6e6r2udh6.apps.googleusercontent.com">
    <Header/>
    <Toaster />
   <RouterProvider router={router}/>
   </GoogleOAuthProvider>
  </React.StrictMode>,
)
