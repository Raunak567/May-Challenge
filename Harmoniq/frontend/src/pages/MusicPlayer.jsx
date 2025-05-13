import React, { useRef, useState, useEffect } from 'react';
import FLUTE from '../assets/example_songs/flute.mp3';
import ALBUM_1 from '../assets/Album-cover/album_cover.gif'

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoadedMetadata = () => setDuration(audio.duration);
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, []);

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

    return (
        <div className="bg-white/10 backdrop-blur mt-20 p-6 rounded-2xl max-w-4xl mx-auto">
            {/* Album Art */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg relative">
                        <img src={ALBUM_1}
                            alt="Album cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                        <div className="absolute bottom-3 left-3">
                            <div className="text-white font-bold">Current Playlist</div>
                            <div className="text-purple-200 text-sm">AI Recommended Mix</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex-grow">
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">Cosmic Waves</span>
                        <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                    </div>

                {/* Seekbar */}
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full accent-purple-500 mb-4"
                />

                {/* Control buttons */}
                <div className="flex justify-between items-center mb-4">
                    <i className="fas fa-random cursor-pointer hover:text-purple-400" />
                    <i className="fas fa-step-backward cursor-pointer hover:text-purple-400" />
                    <button
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] flex items-center justify-center text-white"
                        onClick={togglePlay}
                    >
                        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white`} />
                    </button>
                    <i className="fas fa-step-forward cursor-pointer hover:text-purple-400" />
                    <i className="fas fa-redo cursor-pointer hover:text-purple-400" />
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-volume-down text-gray-400" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-purple-500"
                    />
                </div>

                {/* Tags */}
                {/* <div className="flex gap-2 flex-wrap">
                    {['Electronic', 'Chill', 'Ambient', 'Study'].map((tag) => (
                        <span key={tag} className="px-3 py-1 text-sm bg-purple-800 bg-opacity-40 rounded-full">
                            {tag}
                        </span>
                    ))}
                    <button className="px-3 py-1 text-sm bg-gray-600 rounded-full">
                        <i className="fas fa-plus mr-1"></i> Add Tag
                    </button>
                </div>
            </div> */}
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} src={FLUTE} preload="auto" />
        </div>
        </div >
  );
};

export default MusicPlayer;





{/* // Player Demo
// <div className="bg-white/10 backdrop-blur mt-20 p-6 rounded-2xl max-w-4xl mx-auto">
// <div className="flex flex-col md:flex-row gap-6">
//   <div className="flex-shrink-0">
//     <div className="w-48 h-48 rounded-xl overflow-hidden shadow-lg relative">
//       <img src="https://source.unsplash.com/random/400x400/?music,album"
//       alt="Album cover" className="w-full h-full object-cover" />
//
//       <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
//       <div className="absolute bottom-3 left-3">
//         <div className="text-white font-bold">Current Playlist</div>
//         <div className="text-purple-200 text-sm">AI Recommended Mix</div>
//       </div>
//     </div>
//   </div>


//   <div className="flex-grow">
//     <div className="mb-4">
//       <div className="flex justify-between items-center mb-1">
//         <span className="font-medium">Cosmic Waves</span>
//         <span className="text-sm text-gray-400">3:42</span>
//       </div>




//       <div className="w-full bg-gray-700 rounded-full h-1.5">
//         <div className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] h-1.5 rounded-full" style={{ width: '65%' }}></div>
//       </div>
//     </div>







//     <div className="flex items-center justify-between mb-6 text-gray-300">
//       <i className="fas fa-random hover:text-white cursor-pointer"></i>
//       <i className="fas fa-step-backward hover:text-white cursor-pointer"></i>
//       <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] flex items-center justify-center text-white">
//         <i className="fas fa-pause"></i>
//       </button>
//       <i className="fas fa-step-forward hover:text-white cursor-pointer"></i>
//       <i className="fas fa-redo hover:text-white cursor-pointer"></i>
//     </div>
//     <div className="flex items-center gap-2">
//       <i className="fas fa-volume-down text-gray-400"></i>
//       <div className="w-full bg-gray-700 rounded-full h-1.5">
//         <div className="bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] h-1.5 rounded-full" style={{ width: '80%' }}></div>
//       </div>
//     </div>
//     <div className="mt-6 flex flex-wrap gap-2">
//       {['Electronic', 'Chill', 'Ambient', 'Study'].map(tag => (
//         <span key={tag} className="px-3 py-1 bg-purple-900 bg-opacity-40 rounded-full text-xs hover:translate-y-[-2px] transition shadow-md">
//           {tag}
//         </span>
//       ))}
//       <button className="px-3 py-1 bg-gray-700 bg-opacity-40 rounded-full text-xs hover:bg-gray-600 flex items-center">
//         <i className="fas fa-plus mr-1"></i> Add Tag
//       </button>
//     </div>
//   </div>
// </div>
// </div>
// </section> */}
