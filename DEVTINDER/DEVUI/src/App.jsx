import { useState } from 'react'
import Body from './Body'
import Login from './Login'
import './App.css'

import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
         <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login/>}/>
         </Route>
        
      </Routes>
    </BrowserRouter>
    
     

    </>
  )
}

export default App
