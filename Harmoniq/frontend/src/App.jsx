import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Home/Dashboard'
import LandingPage from './pages/LandingPage'

import Topbar from './components/Topbar';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';


const App = () => {

  return (
    <div>
      <Router>
         <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback
        
        signUpForceRedirectUrl={"/auth-callback"}
        />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path='/Dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
    </div>
    
  );
};

export default App;
