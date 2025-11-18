import React, { use } from 'react'
import {useDispatch, useSelector} from "react-redux"
const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
    const getFeed=async ()=>{
        if(feed) return;
        try{
          const res=await axios.get("http://localhost:3000/feed");
        dispatch(addfeed(res.data));
      }catch(err){
        console.log("Error in fetching feed",err.message);
      }
    }
    useEffect(()=>{
      getFeed();
    },[])
  return (
    <div>Feed</div>
  )
}

export default Feed