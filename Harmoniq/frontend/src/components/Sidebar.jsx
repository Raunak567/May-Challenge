import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <i className="fas fa-headphones text-blue-500 text-2xl mr-3"></i>
          <h1 className="text-xl font-bold">HarmonyFlow</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {[
          { icon: 'fa-home', label: 'Home', active: true },
          { icon: 'fa-music', label: 'Library' },
          { icon: 'fa-heart', label: 'Favorites' },
          { icon: 'fa-clock', label: 'Recent' },
          { icon: 'fa-robot', label: 'AI Mixes' },
          { icon: 'fa-tags', label: 'Tags' },
        ].map(({ icon, label, active }) => (
          <a
            key={label}
            href="#"
            className={`flex items-center px-4 py-3 rounded-lg ${
              active
                ? 'bg-slate-800 text-blue-400'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className={`fas ${icon} mr-3`}></i>
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">AI Playlist Generator</h3>
          <p className="text-xs text-slate-400 mb-3">
            Create a playlist based on your mood or activity
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm flex items-center justify-center">
            <i className="fas fa-magic mr-2"></i> Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
