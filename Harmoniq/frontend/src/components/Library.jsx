import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompactDisc,
  faPlay,
  faPause,
  faHeart,
  faPlus,
  faEllipsisH,
  faMusic,
  faList,
  faHistory,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import styles from './Library.module.css';

const categories = [
  { id: 'all', name: 'All Songs', icon: faMusic },
  { id: 'playlists', name: 'Playlists', icon: faList },
  { id: 'recent', name: 'Recently Played', icon: faHistory }
];


const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('songs'); // 'songs' or 'playlists'
  const [audio] = useState(new Audio());

  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const playSong = (song) => {
    if (currentSong && currentSong.id === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      audio.src = song.audioUrl;
      audio.play();
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const addToPlaylist = async (songId, playlistId) => {
    try {
      await axios.post(`http://localhost:3000/api/playlists/${playlistId}/songs`, {
        songId
      });
      // Refresh playlists after adding song
      fetchPlaylists();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const createPlaylist = async (name) => {
    try {
      await axios.post('http://localhost:3000/api/playlists', { name });
      fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${styles.container} p-8`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <FontAwesomeIcon icon={faCompactDisc} className="mr-3 text-purple-400" />
          My Library
        </h1>
        
        {/* Search Bar */}
        <div className={`${styles.searchBar} flex items-center max-w-md w-full`}>
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search in library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none w-full text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              ${styles.categoryButton}
              ${selectedCategory === category.id ? styles.categoryActive : ''}
              px-4 py-2 rounded-lg flex items-center
            `}
          >
            <FontAwesomeIcon icon={category.icon} className="mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('songs')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'songs'
              ? 'bg-purple-600'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <FontAwesomeIcon icon={faMusic} className="mr-2" />
          Songs
        </button>
        <button
          onClick={() => setActiveTab('playlists')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'playlists'
              ? 'bg-purple-600'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <FontAwesomeIcon icon={faList} className="mr-2" />
          Playlists
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8">
        {/* Songs List */}
        {selectedCategory !== 'playlists' && (
          <div className={`${styles.glassCard} rounded-xl p-6`}>
            <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
            <div className="space-y-4">
              {filteredSongs.map(song => (
                <div 
                  key={song.id}
                  className={`${styles.songRow} flex items-center justify-between p-3 rounded-lg`}
                >
                  <div className="flex items-center flex-1">
                    <img 
                      src={song.imageUrl} 
                      alt={song.title}
                      className="w-12 h-12 rounded object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{song.title}</h3>
                      <p className="text-gray-400 text-sm">{song.artist}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{song.duration}</span>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <button 
                      onClick={() => playSong(song)}
                      className={`${styles.actionButton} text-white`}
                    >
                      <FontAwesomeIcon 
                        icon={currentSong?.id === song.id && isPlaying ? faPause : faPlay} 
                      />
                    </button>
                    <button 
                      onClick={() => toggleLike(song.id)}
                      className={`${styles.actionButton} ${song.liked ? 'text-pink-500' : 'text-gray-400'}`}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <div className="relative group">
                      <button className={`${styles.actionButton} text-gray-400`}>
                        <FontAwesomeIcon icon={faEllipsisH} />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                        {playlists.map((playlist) => (
                          <button
                            key={playlist.id}
                            onClick={() => addToPlaylist(song.id, playlist.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                          >
                            Add to {playlist.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playlists Grid */}
        {selectedCategory !== 'recent' && (
          <div className={`${styles.glassCard} rounded-xl p-6`}>
            <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create Playlist Card */}
              <div className={`${styles.createPlaylist} rounded-lg p-6 text-center`}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlus} className="text-2xl text-white" />
                </div>
                <h3 className="text-white font-medium mb-2">Create Playlist</h3>
                <p className="text-gray-400 text-sm">Start a new collection</p>
              </div>

              {/* Playlist Cards */}
              {playlists.map(playlist => (
                <div 
                  key={playlist.id}
                  className={`${styles.playlistCard} rounded-lg p-4`}
                >
                  <img 
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full aspect-square rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-white font-medium mb-1">{playlist.name}</h3>
                  <p className="text-gray-400 text-sm">{playlist.songCount} songs</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library; 