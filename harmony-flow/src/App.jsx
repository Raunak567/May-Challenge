import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <MainContent />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default App;
