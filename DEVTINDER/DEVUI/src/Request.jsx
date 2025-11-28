import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests,removeRequest } from './utils/requests'
const Request = () => {
    //in appstore we stored in requests so from there store.requests data is fetched
    const requests=useSelector(store=>store.requests)
    const dispatch=useDispatch();
    
  const ReviewRequest=async(status,_id)=>{
    try{
       const review=await axios.post("http://localhost:3000/request/review/"+status+"/"+_id,{},{
        withCredentials:true,
       })
       dispatch(removeRequest(_id));
    }catch(err){
         console.log("Error :"+err.message);
         
    }
}
    const FetchRequest=async()=>{
        try{
            const request=await axios.get("http://localhost:3000/user/requests",{
            withCredentials:true
        })
        console.log(request)
        dispatch(addRequests(request.data.data))
    }catch(err){
        console.log("Error in fetching requests",err.message);
    }
    }
    useEffect(()=>{
        FetchRequest()
    },[])
      if(!requests) return;
      if(requests.length===0){
        return <h1>No Request found........</h1>
      }
  return (
    <div className='text-center my-10 w-1/3 mx-auto'>
        <h1 className='font-bold text-2xl'>Connection Requests</h1>
        {requests.map((plot)=>{
            const {_id,firstname,lastname,photoUrl,about,age,gender}=plot.fromUserID;
         return (
           <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg  bg-base-300  mx-auto'>
            <div><img src={photoUrl} alt="profile pic" className='w-20 h-20 rounded-full '/></div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstname} {lastname}</h2>
            <h2>{about}</h2>
            {age && gender && <p>{age+","+gender}</p>}
            </div>
            <div className='flex '>
              {/* to understand why plot._id or plot.fromUserID is used just check redux store how data is coming */}
                <button className="btn btn-outline btn-success mx-2 " onClick={()=>{ReviewRequest("accepted",plot._id)}}>Accept</button>
                <button className="btn btn-outline btn-error mx-2" onClick={()=>{ReviewRequest("rejected",plot._id)}}>Reject</button>
            </div>
          </div>
         )
        })}
        
    </div>
    
  )
}

export default Request