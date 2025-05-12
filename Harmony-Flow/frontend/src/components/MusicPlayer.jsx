import React from 'react';

const MusicPlayer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center w-1/4">
            <img
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad"
              alt="Album cover"
              className="w-12 h-12 rounded mr-3 rotate-record"
            />
            <div>
              <h4 className="font-medium text-sm">Do I Wanna Know?</h4>
              <p className="text-slate-400 text-xs">Arctic Monkeys</p>
            </div>
            <button className="ml-4 text-slate-400 hover:text-white">
              <i className="fas fa-heart"></i>
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center space-x-4 mb-2">
              <button className="text-slate-400 hover:text-white">
                <i className="fas fa-random"></i>
              </button>
              <button className="text-slate-400 hover:text-white">
                <i className="fas fa-step-backward"></i>
              </button>
              <button className="bg-white text-slate-900 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
                <i className="fas fa-pause"></i>
              </button>
              <button className="text-slate-400 hover:text-white">
                <i className="fas fa-step-forward"></i>
              </button>
              <button className="text-slate-400 hover:text-white">
                <i className="fas fa-redo"></i>
              </button>
            </div>
            <div className="w-full flex items-center space-x-3">
              <span className="text-xs text-slate-400">2:45</span>
              <input
                type="range"
                min="0"
                max="100"
                value="45"
                className="progress-bar w-full"
              />
              <span className="text-xs text-slate-400">4:32</span>
            </div>
          </div>

          {/* Volume & Extras */}
          <div className="flex items-center justify-end w-1/4 space-x-4">
            <div className="flex items-center">
              <i className="fas fa-list-ul text-slate-400 mr-2"></i>
              <div className="waveform w-24"></div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-volume-up text-slate-400 mr-2"></i>
              <input
                type="range"
                min="0"
                max="100"
                value="80"
                className="volume-bar w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
