import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Body = () => {
  return (
    <div>
         <NavBar/>
         {/* // Any children route will render here in Outlet */}
         <Outlet/> 
         <Footer/>
    </div>
  )
}

export default Body