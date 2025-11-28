import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import { addfeed,removefeed } from './utils/feedSlice'
const Usercard = ({user}) => {
  
   const { _id, firstname, lastname, photoUrl, age, gender, about } = user;
   const dispatch=useDispatch();
   console.log(user);
   
  
   const handleSendRequest=async(status,userId)=>{
    try{
      const choice=await axios.post("http://localhost:3000/request/send/"+status+"/"+userId,{},{
        withCredentials:true,
      })
      dispatch(removefeed(userId));
    }
    catch(err){
      console.log("Error :"+err.message);
      
    }
   }

  return (
    <div>
        <div className="card bg-base-100 w-96 shadow-sm ">
  <figure>
    <img

      src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstname+" "+lastname}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about || "This is default about user"}</p>
    <div className="card-actions my-4 justify-center">
      {/* here we are directly getting _id from user i also have logged it to check */}
      <button className="btn btn-primary" onClick={()=>{handleSendRequest("ignored",_id)}}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>{handleSendRequest("interested",_id)}}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Usercard