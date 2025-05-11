import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp' 
import Dashboard from './pages/Home/Dashboard'
import LandingPage from './pages/LandingPage'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import MainContent from './components/MainContent';


const App = () => {
  // You might want to add authentication state management here
  const isAuthenticated = true; // This should be managed with your auth state

  return (
    <div>
      <Router>
         <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100 font-sans">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Navbar />
                  <MainContent />
                  <MusicPlayer />
                </div>
              </div>
            ) : 
            (
              <Navigate to="/login" replace />
            )
          }
        />
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
