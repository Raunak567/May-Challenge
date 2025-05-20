import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Home/Dashboard'
import LandingPage from './pages/LandingPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';
import AlbumPage from './pages/Album/AlbumPage';
import NotFoundPage from './pages/404/NotFoundPage';
import AdminPage from './pages/admin/AdminPage';


const App = () => {

  return (
    <>
      <Routes>
        <Route
          path='/sso-callback'
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl='/auth-callback' />
          }
        />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path='/admin' element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='/land' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
