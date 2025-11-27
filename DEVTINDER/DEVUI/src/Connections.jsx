import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { addConnections,removeConnections } from './utils/ConnectionSlice'
import { useDispatch, useSelector } from 'react-redux'
const Connections = () => {
  const connections=useSelector(store=>store.connections)
  const dispatch=useDispatch();
const FetchConnections=async()=>{
    try{
      const connect=await axios.get('http://localhost:3000/user/connections',{
      withCredentials:true
    })
    console.log(connect.data.data)
    dispatch(addConnections(connect.data.data))
  }catch(err){
    console.log("Error in fetching connections",err.message);
  }

}
useEffect(()=>{
  FetchConnections()
},[])
      if(!connections) return;
      if(connections.length===0){
        return <h1>Make some connections........</h1>
      }
  return (
    <div className='text-center my-10 w-1/2 mx-auto'>
        <h1 className='font-bold text-2xl'>Connections</h1>
        {connections.map((plot)=>{
         return (
           <div className='flex m-4 p-4 rounded-lg bg-base-200'>
            <div><img src={plot.photoUrl} alt="profile pic" className='w-20 h-20 rounded-full '/></div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{plot.firstname} {plot.lastname}</h2>
            <h2>{plot.about}</h2>
            {plot.age && plot.gender && <p>{plot.age+","+plot.gender}</p>}
            </div>
          </div>
         )
        })}
    </div>
    
  )
}

export default Connections