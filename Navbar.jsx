import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search songs, artists, or tags..."
          className="w-full bg-slate-800 text-slate-200 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <i className="fas fa-search absolute left-3 top-3 text-slate-500"></i>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-slate-400 hover:text-white">
          <i className="fas fa-bell"></i>
        </button>
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
            alt="User"
            className="rounded-full h-8 w-8"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
