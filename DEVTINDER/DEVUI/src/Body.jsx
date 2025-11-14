import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useEffect } from 'react'
const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector(store=>store.user)
  const FetchUser=async ()=>{
   try{
    if(userData) return;
       const user=await axios.get("http://localhost:3000/profile/view",{
      withCredentials:true
    })
    dispatch(addUser(user.data))
  }catch(err){
     if (err.response && err.response.status === 401) {
        navigate('/login');
      }
    console.error(err);
  }
  }

    useEffect(()=>{
      
        FetchUser()
      
    },[])
  return (
    <div>
         <NavBar/>
         {/* // Any children route will render here in Outlet */}
         <Outlet/> 
         <Footer/>
    </div>
  )
}

export default Body