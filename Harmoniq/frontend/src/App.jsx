import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';
import AlbumPage from './pages/Album/AlbumPage';
import NotFoundPage from './pages/404/NotFoundPage';
import AdminPage from './pages/admin/AdminPage';
import Mood from './components/Mood';
import Karaoke from './components/Karaoke';
import Tags from './components/tags';
import Library from './components/Library';


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
          <Route path='/moods' element={<Mood />} />
          <Route path='/library' element={<Library />} />
          <Route path='/tags' element={<Tags />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route path='/karaoke' element={<Karaoke />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
