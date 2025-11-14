import React from 'react'

const Feed = () => {
    const getFeed=async ()=>{
        const res=await axios.get("http://localhost:3000/feed");
        
    }
  return (
    <div>Feed</div>
  )
}

export default Feed