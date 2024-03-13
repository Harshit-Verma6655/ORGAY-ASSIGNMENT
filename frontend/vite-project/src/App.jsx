// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import User from "./components/User"
import Notifications from "./components/Notifications"

function App() {




  return (
    <>

      <Routes>



        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>


    </>




  )
}

export default App