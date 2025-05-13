import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import Dashboard from './pages/Home/Dashboard'
import LandingPage from './pages/LandingPage'


const App = () => {

  return (
    <div>
      <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>

      <Router>
         <Routes>
        <Route path="/" element={<LandingPage />} />
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
