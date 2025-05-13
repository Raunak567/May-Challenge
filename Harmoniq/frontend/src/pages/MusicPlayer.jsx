import React, { useRef, useState, useEffect } from 'react';
import FLUTE from '../assets/example_songs/flute.mp3';
import Blinding_Lights from "../assets/example_songs/Blinding_Lights.mp3"
import ALBUM_1 from '../assets/Album-cover/album_cover.gif'

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const songs = [
        { title: "Enchanting Flute", file: FLUTE },
        { title: "Blinding Lights", file: Blinding_Lights }
    ];

    const currentSong = songs[currentSongIndex];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentSongIndex(randomIndex);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.load(); // reload audio element
        if (isPlaying) {
            audio.play();
        }

        const onLoadedMetadata = () => setDuration(audio.duration);
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, [currentSongIndex]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSkip = (direction) => {
        if (direction === 'next') {
            setCurrentSongIndex((prev) => (prev + 1) % songs.length);
        } else if (direction === 'prev') {
            setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        }
    };

    const handleShuffle = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex);
        setCurrentSongIndex(randomIndex);
    };

    return (
        <div className="bg-[#1b1b1f] bg-opacity-80 backdrop-blur-md p-6 rounded-2xl max-w-4xl mx-auto text-white mt-35  shadow-lg">
        {/* Album Art + Song Info */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-fuchsia-600/40">
            <img src={ALBUM_1} alt="Album cover" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 w-full overflow-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold truncate">{currentSong.title}</h2>
              <span className="text-sm text-gray-400">{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-fuchsia-500 mt-2 transition-all duration-200 hover:accent-pink-500"
            />
          </div>
        </div>
      
        {/* Controls */}
        <div className="flex items-center justify-between mt-6 px-4">
          <i
            className="fas fa-random cursor-pointer text-gray-400 hover:text-fuchsia-400 hover:scale-105 transition-all duration-200"
            onClick={handleShuffle}
          />
          <i
            className="fas fa-step-backward cursor-pointer text-gray-400 hover:text-fuchsia-400 hover:scale-105 transition-all duration-200"
            onClick={() => handleSkip('prev')}
          />
      
          <button
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-2xl active:scale-95 transition-all duration-200"
            onClick={togglePlay}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-xl`} />
          </button>
      
          <i
            className="fas fa-step-forward cursor-pointer text-gray-400 hover:text-fuchsia-400 hover:scale-105 transition-all duration-200"
            onClick={() => handleSkip('next')}
          />
          <i
            className="fas fa-redo cursor-pointer text-gray-400 hover:text-fuchsia-400 hover:scale-105 transition-all duration-200"
            onClick={() => {
              audioRef.current.currentTime = 0;
              if (!isPlaying) togglePlay();
            }}
          />
        </div>
      
        {/* Volume */}
        <div className="flex items-center gap-3 mt-6">
          <i className="fas fa-volume-down text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-fuchsia-500 hover:accent-pink-500 transition-all duration-200"
          />
        </div>
      
        <audio ref={audioRef} preload="auto">
          <source src={currentSong.file} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      

    );
};

export default MusicPlayer;