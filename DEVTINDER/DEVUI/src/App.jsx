import { useState } from 'react'
import Body from './Body'
import Login from './Login'
import Feed from './Feed'
import './App.css'
import {Provider} from "react-redux"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import appstore from './utils/appstore'
import Profile from './Profile'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appstore}>
    <BrowserRouter basename='/'>
      <Routes>
  <Route path="/" element={<Body />}>
    {/* index route = default nested route */}
    <Route path='/feed' element={<Feed />} />
    
    {/* child routes should NOT start with "/" */}
    <Route path="profile" element={<Profile />} />
    <Route path="login" element={<Login />} />
  </Route>
</Routes>

    </BrowserRouter>
    </Provider>
     

    </>
  )
}

export default App
