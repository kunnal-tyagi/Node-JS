import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import { removefeed } from './utils/feedSlice'
const Usercard = ({user}) => {
  
   const { _id, firstname, lastname, photoUrl, age, gender, about } = user;
   const dispatch=useDispatch();
  
   const handleSendRequest=async(status,userId)=>{
    
   }

  return (
    <div>
        <div className="card bg-base-100 w-96 shadow-sm ">
  <figure>
    <img
    // here we'not getting photoUrl from backend because in earlier data i had no field for photurl
      src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstname+" "+lastname}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about || "This is default about user"}</p>
    <div className="card-actions my-4 justify-center">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Usercard