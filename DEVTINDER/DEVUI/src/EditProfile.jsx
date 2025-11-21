import React from 'react'
import { useState } from 'react'
import {useDispatch} from "react-redux"
import axios from 'axios'
import { addUser } from './utils/userSlice'
const EditProfile = ({user}) => {
    if (!user) return <p>Loading profile...</p>; // Show something while user is not available

  const [firstName, setFirstName] = useState(user.firstname || "");
  const [lastName, setLastName] = useState(user.lastname || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
    const dispatch=useDispatch();

  const SaveProfile=async()=>{
    try{
        const Updated=await axios.patch("http://localhost:3000/profile/edit",{
            firstname: firstName, // frontend state -> backend key
        lastname: lastName,
            photoUrl,
            age,
            gender,
            about
        },{
            withCredentials:true
        });
        console.log("Updated Profile:",Updated.data);
        dispatch(addUser(Updated.data));
    }catch(err){
        console.error(err);
        }
    }
  
  return (
    <div>
         <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title mx-30">Edit Profile</h2>
    <div>
     {/* first Name */}
     
       <label className="input validator my-1">
        
  <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5.121 17.804A13.937 13.937 0 0112 15c2.61 0 5.043.687 7.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  />
</svg>

 
  <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder="firstName"  />
        </label>

    
    {/*Last Name */}
     
      <label className="input validator my-2">
  <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5.121 17.804A13.937 13.937 0 0112 15c2.61 0 5.043.687 7.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  />
</svg>

  <input
    type="text"
   
    value={lastName}
    onChange={(e)=>{setLastName(e.target.value)}}
    placeholder="LastName"
   
  />
       </label>
       {/* PhotoUrl */}
      <label className="input validator my-2">
 <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5 text-gray-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 7l7 7 4-4 5 5"
  />
</svg>


  <input
    type="url"
   
    value={photoUrl}
    onChange={(e)=>{setPhotoUrl(e.target.value)}}
    placeholder="Enter Photo URL"
   
  />
       </label>
       {/* Age */}
      <label className="input validator my-2">
 <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5 text-gray-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  />
</svg>



  <input
    type="number"
   
    value={age}
    onChange={(e)=>{setAge(e.target.value)}}
    placeholder="Enter Age"
   
  />
       </label>
       {/* Gender */}
      <label className="input validator my-2">
 <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5 text-gray-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle cx="12" cy="12" r="4" strokeWidth="2" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8M8 12h8" />
</svg>





  <select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  className=" w-full"
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>

       </label>
       {/* About */}
     <div className="flex items-start border rounded-lg overflow-hidden mb-3">
  {/* Icon */}
  <span className="px-3 pt-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
      />
    </svg>
  </span>

  {/* Textarea */}
  <textarea
    value={about}
    onChange={(e) => setAbout(e.target.value)}
    placeholder="About You"
    className="flex-1 border-l border-gray-300 p-2 h-24 resize-none outline-none"
  />
</div>


    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary"  onClick={SaveProfile}>Save Profile</button>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default EditProfile