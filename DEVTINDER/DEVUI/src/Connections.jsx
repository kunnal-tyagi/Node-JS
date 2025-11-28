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
        return <div className='text-center mt-20'>
  <h2 className='text-xl font-semibold text-gray-500'>You have no connections yet!</h2>
</div>

      }
  return (
    <div className='text-center my-10 w-11/12 sm:w-3/4 md:w-1/2 mx-auto'>
        <h1 className='font-bold text-2xl'>Connections</h1>
        {connections.map((plot)=>{
         return (
           <div className='flex flex-col sm:flex-row items-center sm:items-start m-4 p-4 rounded-lg bg-base-200 shadow-md'>
            <div  className='flex-shrink-0'><img src={plot.photoUrl} alt="profile pic" className='w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover'/></div>
            <div className='text-center sm:text-left mt-4 sm:mt-0 sm:ml-4'>
              <h2 className='font-bold text-xl'>{plot.firstname} {plot.lastname}</h2>
            <h2 className='text-gray-600'>{plot.about}</h2>
            {plot.age && plot.gender && <p className='text-gray-500'>{plot.age+","+plot.gender}</p>}
            </div>
          </div>
         )
        })}
    </div>
    
  )
}

export default Connections