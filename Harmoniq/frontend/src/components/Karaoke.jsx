import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faArrowLeft,
  faStepBackward,
  faStepForward,
  faPause,
  faPlay,
  faSearch,
  faBell,
  faUserPlus,
  faPaperPlane,
  faUser,
  faCopy,
  faListOl
} from '@fortawesome/free-solid-svg-icons';
import GenerateLyrics from './GenerateLyrics';

const KaraokeRoom = () => {
  const [micMuted, setMicMuted] = useState(false);
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState([]);
  const audioRef = useRef(new Audio());

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.post('http://localhost:3000/api/search', {
        query: searchQuery
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const playSong = (song) => {
    if (currentSong) {
      audioRef.current.pause();
    }
    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const addToQueue = (song) => {
    setQueue([...queue, song]);
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => {
      if (queue.length > 0) {
        const nextSong = queue[0];
        setQueue(queue.slice(1));
        playSong(nextSong);
      } else {
        setIsPlaying(false);
        setCurrentSong(null);
      }
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [queue]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText('ABC123');
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-96 bg-black bg-opacity-20 border-r border-gray-800 flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FontAwesomeIcon icon={faMicrophoneAlt} className="mr-2 text-purple-400" />
              Karaoke Room
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
            <a href="/" className="flex items-center px-4 py-3 rounded-lg bg-purple-900 bg-opacity-30 text-white hover:bg-opacity-40">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-3" /> Back to Lobby
            </a>

            {/* Now Playing Card */}
            {currentSong && (
              <div className="bg-[#141414] bg-opacity-70 backdrop-blur-md border border-white/5 p-4 rounded-lg w-full">
                <div className="flex items-center">
                  <img 
                    src={currentSong.imageUrl}
                    alt="Album Cover"
                    className="w-16 h-16 rounded-lg object-cover shadow-lg"
                  />
                  <div className="ml-3">
                    <p className="font-bold text-white">{currentSong.title}</p>
                    <p className="text-sm text-purple-300">{currentSong.artist}</p>
                    <div className="flex items-center mt-1 text-s text-gray-400 w-full">
                      <span>{Math.floor(currentTime)}</span>
                      <div className="mx-2 flex-1 bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-purple-500 h-1 rounded-full" 
                          style={{ width: `${(currentTime / currentSong.duration) * 100}%` }} 
                        />
                      </div>
                      <span>{currentSong.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-2">
                  <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white">
                    <FontAwesomeIcon icon={faStepBackward} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white">
                    <FontAwesomeIcon icon={faStepForward} />
                  </button>
                </div>
              </div>
            )}

            {/* Queue Section */}
            <div className="bg-[#141414] bg-opacity-70 backdrop-blur-md border border-white/5 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2 flex items-center">
                <FontAwesomeIcon icon={faListOl} className="mr-2 text-purple-400" />
                Up Next
              </h3>
              <div className="space-y-2">
                {queue.map((song, index) => (
                  <div key={index} className="flex items-center p-2 hover:bg-gray-800 rounded-lg">
                    <img 
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded mr-3 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{song.title}</p>
                      <p className="text-xs text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex flex-1">
          <div className="w-3/4 bg-black bg-opacity-20 border-r border-gray-800 flex flex-col">
            {/* Top Bar */}
            <header className="bg-black bg-opacity-20 border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 w-3/4">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search songs..."
                  className="bg-transparent border-none focus:outline-none text-white w-full"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
              >
                Search
              </button>
            </header>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="p-4 bg-[#141414] bg-opacity-70">
                <h3 className="text-white mb-2">Search Results</h3>
                <div className="grid grid-cols-2 gap-4">
                  {searchResults.map((song, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                      onClick={() => addToQueue(song)}
                    >
                      <img 
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-12 h-12 rounded mr-3 object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{song.title}</p>
                        <p className="text-gray-400 text-sm">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6">

              {currentSong && (
                <div className="bg-[#141414] bg-opacity-70 backdrop-blur-md border border-white/5 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Now Singing</h2>
                    <button
                      onClick={() => setMicMuted(!micMuted)}
                      className="text-white text-2xl hover:text-purple-400 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={micMuted ? faMicrophoneAltSlash : faMicrophoneAlt} />
                      
                    </button>
                  </div>

                  <div className="text-center text-purple-300 text-lg font-semibold space-y-3 leading-relaxed">
                    {/* Placeholder lyrics - in a real app, these would be synced with the music */}
                    <p>🎵 {currentSong.title} 🎵</p>
                    <p>by {currentSong.artist}</p>
                    <GenerateLyrics currentSong={currentSong} />
                  </div>
                </div>
              )}

              {/* Chat Section */}
              <div className="bg-[#141414] bg-opacity-70 backdrop-blur-md border border-white/5 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-white mb-3">Live Chat</h2>
                <div className="overflow-y-auto h-48 mb-3 space-y-2">
                  {[
                    { user: 'Sarah', message: 'This line hits hard!' },
                    { user: 'You', message: '🔥🔥' }
                  ].map((chat, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-300 text-sm" />
                      </div>
                      <div className="text-white text-sm">
                        {chat.user}: {chat.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send a message..."
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-l-lg focus:outline-none"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </div>
            </main>
          </div>

          {/* Right Sidebar */}
          <aside className="w-1/4 bg-black bg-opacity-10 border-l border-gray-800 p-6 flex flex-col justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-4">Members</h2>

              {/* Members List */}
              <div className="bg-purple-900 bg-opacity-30 p-4 rounded-lg text-white mb-6">
                {['Sarah', 'You', 'John', 'Alice'].map((member, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                      <FontAwesomeIcon icon={faUser} className="text-gray-300" />
                    </div>
                    <span>{member}</span>
                  </div>
                ))}
              </div>

              {/* Invite Section */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Invite Friends</h2>
                <p className="text-sm text-gray-400 mb-2">Invite via Username</p>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded mb-2 focus:outline-none"
                />
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mb-6">
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Send Invite
                </button>
              </div>
            </div>

            {/* Room Settings */}
            <div className="mt-auto">
              <p className="text-sm text-gray-400 mb-2">Room Code</p>
              <div className="flex items-center bg-gray-800 rounded overflow-hidden mb-4">
                <input
                  type="text"
                  readOnly
                  value="ABC123"
                  className="w-full px-3 py-2 bg-gray-800 text-white focus:outline-none"
                />
                <button
                  onClick={copyRoomCode}
                  className="px-3 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-2">Room Privacy</p>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-gray-400">Private</span>
                <button
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`relative w-10 h-6 transition-colors duration-200 ease-in rounded-full ${
                    isPrivate ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 transition-transform duration-200 ease-in bg-white rounded-full top-1 ${
                      isPrivate ? 'transform translate-x-5 left-1' : 'left-1'
                    }`}
                  />
                </button>
                <span className="text-gray-400">Public</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default KaraokeRoom; 