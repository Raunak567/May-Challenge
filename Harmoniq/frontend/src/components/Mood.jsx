import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  // Sample playlists for each mood
  const playlists = {
    Workout: [
      { title: "Pump It Up", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e02d25d42de726fcd74e5c1e4c3" },
      { title: "Gym Beats", artist: "Fit Music", cover: "https://i.scdn.co/image/ab67616d00001e02b22b6c0f9c8a4f1f5f3e90c4" },
    ],
    Relaxing: [
      { title: "Calm Vibes", artist: "Relaxation Station", cover: "https://i.scdn.co/image/ab67616d00001e02135a3265d839aa62e5f89c66" },
      { title: "Peaceful Piano", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e021ffeb2ab8a2d5d3e1c7f62c6" },
    ],
    Party: [
      { title: "Dance Hits", artist: "Top DJs", cover: "https://i.scdn.co/image/ab67616d00001e0247e1632e8a7d48c4a24f1e9d" },
      { title: "Club Anthems", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e0256a3f9a7f35ef1b7988a2d33" },
    ],
    Focus: [
      { title: "Concentration Boost", artist: "Study Music", cover: "https://i.scdn.co/image/ab67616d00001e02189e1c1b64fdf1471d34de64" },
      { title: "Deep Focus", artist: "Instrumental", cover: "https://i.scdn.co/image/ab67616d00001e0221ff4cdb5ca80cd7c57b9b94" },
    ],
    Romantic: [
      { title: "Love Ballads", artist: "Romance Hits", cover: "https://i.scdn.co/image/ab67616d00001e02bc875365a1c13af7e33d46ad" },
      { title: "Date Night", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e02a3247eeecb0bb3cc1581b0ef" },
    ],
    Chill: [
      { title: "Lo-Fi Chill", artist: "Chillhop", cover: "https://i.scdn.co/image/ab67616d00001e021be4f2829f5e204442b13b09" },
      { title: "Evening Relax", artist: "Ambient", cover: "https://i.scdn.co/image/ab67616d00001e02d3e235e7609d5df08643d60e" },
    ],
    Sleep: [
      { title: "Sleep Sounds", artist: "Nature", cover: "https://i.scdn.co/image/ab67616d00001e024c4e9eb58c8c8f2f32bc92b1" },
      { title: "Dreamscape", artist: "Meditation Music", cover: "https://i.scdn.co/image/ab67616d00001e0241b6f6d2951efdf0adf628f0" },
    ],
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100">
      <main className="p-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <i className="fas fa-smile-beam mr-2 text-purple-400"></i>
            Choose Your Mood
          </h2>
          
          {/* Mood Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            <button 
              onClick={() => handleMoodClick('Workout')}
              className={`mood-card tag bg-blue-900 bg-opacity-30 hover:bg-blue-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-blue-300 font-medium transition ${
                selectedMood === 'Workout' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-dumbbell mb-2 text-blue-400 text-xl"></i>
              Workout
            </button>
            <button 
              onClick={() => handleMoodClick('Relaxing')}
              className={`mood-card tag bg-green-900 bg-opacity-30 hover:bg-green-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-green-300 font-medium transition ${
                selectedMood === 'Relaxing' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-spa mb-2 text-green-400 text-xl"></i>
              Relaxing
            </button>
            <button 
              onClick={() => handleMoodClick('Party')}
              className={`mood-card tag bg-red-900 bg-opacity-30 hover:bg-red-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-red-300 font-medium transition ${
                selectedMood === 'Party' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-music mb-2 text-red-400 text-xl"></i>
              Party
            </button>
            <button 
              onClick={() => handleMoodClick('Focus')}
              className={`mood-card tag bg-yellow-900 bg-opacity-30 hover:bg-yellow-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-yellow-300 font-medium transition ${
                selectedMood === 'Focus' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-brain mb-2 text-yellow-400 text-xl"></i>
              Focus
            </button>
            <button 
              onClick={() => handleMoodClick('Romantic')}
              className={`mood-card tag bg-pink-900 bg-opacity-30 hover:bg-pink-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-pink-300 font-medium transition ${
                selectedMood === 'Romantic' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-heart mb-2 text-pink-400 text-xl"></i>
              Romantic
            </button>
            <button 
              onClick={() => handleMoodClick('Chill')}
              className={`mood-card tag bg-purple-900 bg-opacity-30 hover:bg-purple-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-purple-300 font-medium transition ${
                selectedMood === 'Chill' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-coffee mb-2 text-purple-400 text-xl"></i>
              Chill
            </button>
            <button 
              onClick={() => handleMoodClick('Sleep')}
              className={`mood-card tag bg-teal-900 bg-opacity-30 hover:bg-teal-800 hover:text-white cursor-pointer px-4 py-3 rounded-full text-center text-teal-300 font-medium transition ${
                selectedMood === 'Sleep' ? 'bg-opacity-80 text-white' : ''
              }`}
            >
              <i className="fas fa-bed mb-2 text-teal-400 text-xl"></i>
              Sleep
            </button>
          </div>
          
          {/* Recommended Playlists */}
          <div className="glass-card rounded-xl p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">
              {selectedMood ? `${selectedMood} Playlists` : 'Select a mood to see playlists'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedMood && playlists[selectedMood]?.map((playlist, index) => (
                <div 
                  key={index}
                  className="song-card bg-gray-800 bg-opacity-30 rounded-lg p-4 cursor-pointer flex items-center space-x-4 hover:bg-gray-700 transition"
                >
                  <img 
                    src={playlist.cover} 
                    alt={playlist.title} 
                    className="w-16 h-16 rounded-lg object-cover shadow" 
                  />
                  <div>
                    <h4 className="text-white font-semibold">{playlist.title}</h4>
                    <p className="text-xs text-gray-400">{playlist.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mood;
