import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/authContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App