import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/authContext.jsx';
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App