import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/authContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { ConversationProvider } from './context/conversationContext.jsx';
import { SocketProvider } from './context/socketContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ConversationProvider>
          <SocketProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </SocketProvider>
          <Toaster />
        </ConversationProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App