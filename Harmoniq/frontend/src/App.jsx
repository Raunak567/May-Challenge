import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"

import Dashboard from './pages/Home/Dashboard'
import LandingPage from './pages/LandingPage'


const App = () => {

  return (
    <div>
      <Router>
         <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path='/Dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>

    <Toaster 
    toastOptions={{
      className: "",
      style:{
        fontSize: "13px",
      },
    }}
    />
    </div>
    
  );
};

export default App;
