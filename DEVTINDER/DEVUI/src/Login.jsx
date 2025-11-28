import React, { useState } from 'react'
import { useDispatch } from "react-redux";

import axios from 'axios'
import { addUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email,setEmailId]=useState("")
    const [password,setPassword]=useState("")
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("")
    const [IsLogin,setIsLogin]=useState(true)
   const dispatch=useDispatch();
   const navigate=useNavigate();
    const handleLogin=async ()=>{
      try{
        const res = await axios.post(
        // "https://solid-space-fishstick-r456xgrrq9q4fwqv9-3000.app.github.dev/api/login",
        "http://localhost:3000/login",

      { email, password },
      { withCredentials: true } // important for cookies
);
    dispatch(addUser(res.data));
    return navigate("/feed")

      }catch(err){
        console.log(err.message);
        
      }
    }
    const handleRegister=async ()=>{
      try{
        const res = await axios.post(
        // "https://solid-space-fishstick-r456xgrrq9q4fwqv9-3000.app.github.dev/api/login",
        "http://localhost:3000/register",

      {firstname,lastname, email, password },
      { withCredentials: true } // important for cookies
);
    console.log(res);
    
    dispatch(addUser(res.data.data));
     return navigate("/profile")

      }catch(err){
        console.log(err.message);
        
      }
    }
  return (
    <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title mx-30">
      {IsLogin?"Login":"Register"}
      </h2>
    <div>
    
      { !IsLogin&&<><label className="input validator my-3">
  <svg
  className="h-[1em] w-[1em] opacity-50"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M5.121 17.804A9.956 9.956 0 0112 15c2.21 0 4.247.712 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  />
</svg>

  <input type="text" value={firstname} onChange={(e)=>{setfirstname(e.target.value)}} placeholder="firstname" required />
        </label>
       <label className="input validator my-3">
  <svg
  className="h-[1em] w-[1em] opacity-50"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M5.121 17.804A9.956 9.956 0 0112 15c2.21 0 4.247.712 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  />
</svg>

  <input type="text" value={lastname} onChange={(e)=>{setlastname(e.target.value)}} placeholder="lastname" required />
        </label></>}
         {/* Email input */}
       <label className="input validator my-3">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input type="email" value={email} onChange={(e)=>{setEmailId(e.target.value)}} placeholder="mail@site.com" required />
        </label>
<div className="validator-hint hidden">Enter valid email address</div>
    
    {/*Password Input  */}
      <label className="input validator my-5">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    value={password}
    onChange={(e)=>{setPassword(e.target.value)}}
    placeholder="Password"
    minLength="8"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
  />
       </label>
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
</p>

    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={IsLogin?handleLogin:handleRegister}>{IsLogin ? "Login" : "Register"}</button>
    </div>
    <p
    className="m-auto cursor-pointer py-2"
    onClick={() => setIsLogin((value) => !value)}
    >
      {IsLogin?"Don't have an account?":"Already have an account?"}
    </p>
  </div>
</div>
    </div>
  )
}

export default Login