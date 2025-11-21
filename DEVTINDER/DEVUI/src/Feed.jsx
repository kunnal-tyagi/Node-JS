import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import Usercard from './Usercard'
import { addfeed } from './utils/feedSlice'
const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
    const getFeed=async ()=>{
     

      
        if(feed.length>0) return;
        try{
          const res=await axios.get("http://localhost:3000/feed", {
  withCredentials: true
});

        dispatch(addfeed(res.data.users));
      }catch(err){
        console.log("Error in fetching feed",err.message);
      }
    }
    useEffect(()=>{
      getFeed();
    },[])
  return (
     <div className='flex justify-center my-10'>
      {feed.length > 0 ? (
        <Usercard user={feed[0]} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Feed