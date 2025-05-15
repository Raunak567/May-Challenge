import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const tags = [
    { label: "Workout", bg: "bg-blue-900", text: "text-blue-300" },
    { label: "Relaxing", bg: "bg-green-900", text: "text-green-300" },
    { label: "Party", bg: "bg-red-900", text: "text-red-300" },
    { label: "Focus", bg: "bg-yellow-900", text: "text-yellow-300" },
    { label: "Romantic", bg: "bg-pink-900", text: "text-pink-300" },
    { label: "Study", bg: "bg-indigo-900", text: "text-indigo-300" },
    { label: "Chill", bg: "bg-purple-900", text: "text-purple-300" },
    { label: "Sleep", bg: "bg-teal-900", text: "text-teal-300" },
  ];

  const songs = [
    {
      title: "Levitating",
      artist: "Dua Lipa",
      img: "https://i.scdn.co/image/ab67616d00001e02c3a0c3a0c3a0c3a0c3a0c3a0",
    },
    {
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      img: "https://i.scdn.co/image/ab67616d00001e02d3a0d3a0d3a0d3a0d3a0d3a0",
    },
    {
      title: "good 4 u",
      artist: "Olivia Rodrigo",
      img: "https://i.scdn.co/image/ab67616d00001e02e3a0e3a0e3a0e3a0e3a0e3a0",
    },
    {
      title: "Montero",
      artist: "Lil Nas X",
      img: "https://i.scdn.co/image/ab67616d00001e02f3a0f3a0f3a0f3a0f3a0f3a0",
    },
    {
      title: "Peaches",
      artist: "Justin Bieber",
      img: "https://i.scdn.co/image/ab67616d00001e02a4a0a4a0a4a0a4a0a4a0a4a0",
    },
  ];

  const navItems = [
    ['Dashboard', 'home', '/'],
    ['Favorites', 'heart', '/favorites'],
    ['Moods', 'smile-beam', '/moods'],
    ['Karaoke', 'microphone-alt', '/karaoke'],
    ['Chatroom', 'comments', '/chatroom'],
    ['AI Discover', 'robot', '/ai-discover'],
    ['Library', 'compact-disc', '/library'],
    ['Tags', 'tags', '/tags'],
    ['Settings', 'sliders-h', '/settings'],
  ];

  return (
    <div id='gradient-bg' className="min-h-screen  font-[Poppins] text-[#e0e0e0]">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-black bg-opacity-20 border-r border-gray-800 flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <i className="fas fa-music mr-2 text-purple-500"></i>
              HarmonyFlow
            </h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map(([label, icon, path], i) => (
              <Link
                key={i}
                to={path}
                className={`flex items-center px-4 py-3 rounded-lg ${i === 0
                  ? 'bg-purple-900 bg-opacity-30 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:bg-opacity-50 hover:text-white'
                  }`}
              >
                <i className={`fas fa-${icon} mr-3`}></i>
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-xs text-gray-400">Premium Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden ">
          {/* Top Bar */}
          <header className="bg-black bg-opacity-20 border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 w-96">
              <i className="fas fa-search text-gray-400 mr-2"></i>
              <input
                type="text"
                placeholder="Search songs, artists, or tags..."
                className="bg-transparent border-none focus:outline-none text-white w-full"
              />
            </div>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <button class="action-btn notification-btn" title= "Notification">
                  <i class="fas fa-bell"></i>
                </button>
                <div class="notification-badge">3</div>
              </div>

              <div class="relative">
                <button class="action-btn friend-btn" title= "Add Friend">
                  <i class="fas fa-user-plus"></i>
                </button>
              </div>

              <div class="relative">
                <button class="action-btn message-btn" title= "Massage">
                  <i class="fas fa-envelope"></i>
                </button>
                <div class="notification-badge">7</div>
              </div>

              <div class="w-px h-8 bg-gray-700 mx-2"></div>

              <button class="flex items-center space-x-2 bg-gray-800 bg-opacity-50 hover:bg-gray-700 px-3 py-2 rounded-full transition-all">
                <span class="text-sm font-medium text-white">Upgrade</span>
                <i class="fas fa-crown text-yellow-400"></i>
              </button>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Now Playing */}
              <div className="lg:col-span-2">
                <div id="glass-card" className="rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <i className="fas fa-play-circle mr-2 text-purple-400"></i>
                    Now Playing
                  </h2>
                  <div className="flex items-center mb-6">
                    <img
                      src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
                      alt="Album Cover"
                      className="w-32 h-32 rounded-lg object-cover shadow-lg"
                    />
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-white">Blinding Lights</h3>
                      <p className="text-gray-400">The Weeknd</p>
                      <div className="flex mt-3 space-x-2">
                        {['Pop', 'Synthwave', '80s'].map((tag, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-xs rounded-full ${tag === 'Pop'
                              ? 'bg-purple-900 text-purple-300'
                              : tag === 'Synthwave'
                                ? 'bg-blue-900 text-blue-300'
                                : 'bg-pink-900 text-pink-300'
                              } bg-opacity-30`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div id="progress-bar" className="rounded-full mb-2">
                      <div
                        id='progress-fill'
                        className=" rounded-full"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>2:34</span>
                      <span>3:20</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-8 space-x-8">
                    {[
                      ['random', 'gray-400'],
                      ['step-backward', 'gray-400'],
                      ['pause', 'white', 'bg-purple-600 hover:bg-purple-700 w-12 h-12 rounded-full'],
                      ['step-forward', 'gray-400'],
                      ['redo', 'gray-400'],
                    ].map(([icon, color, extra], i) => (
                      <button
                        key={i}
                        className={`text-${color} hover:text-white ${extra ? extra : ''
                          } flex items-center justify-center`}
                      >
                        <i className={`fas fa-${icon} text-xl`}></i>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Queue */}
                <div id="glass-card" className=" rounded-xl p-6 mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                      <i className="fas fa-list-ol mr-2 text-purple-400"></i>
                      Current Queue
                    </h2>
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      View All
                    </button>
                  </div>
                  {[
                    ['Save Your Tears', 'The Weeknd', '3:35', 'play', 'gray-400', false],
                    ['Blinding Lights', 'The Weeknd', '3:20', 'pause', 'white', true],
                    ['Starboy', 'The Weeknd, Daft Punk', '3:50', 'play', 'gray-400', false],
                  ].map(([title, artist, time, icon, iconColor, active], i) => (
                    <div
                      key={i}
                      className={`flex items-center p-3 rounded-lg cursor-pointer ${active
                        ? 'bg-gray-800 bg-opacity-30'
                        : 'hover:bg-gray-800 hover:bg-opacity-50'
                        }`}
                    >
                      <div
                        className={`w-10 h-10 ${active ? 'bg-purple-600' : 'bg-gray-700'
                          } rounded flex items-center justify-center mr-4`}
                      >
                        <i className={`fas fa-${icon} text-${iconColor}`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-white ${active ? 'font-medium' : ''}`}>
                          {title}
                        </h4>
                        <p className="text-xs text-gray-400">{artist}</p>
                      </div>
                      <div
                        className={`text-xs ${active ? 'text-purple-400' : 'text-gray-400'
                          }`}
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div class="space-y-6">
                <div id="glass-card" class=" rounded-xl p-6">
                  <h2 class="text-xl font-bold text-white mb-6 flex items-center">
                    <i id="ai-pulse" class="fas fa-robot mr-2 text-purple-400 "></i>
                    AI Recommendations
                  </h2>
                  <div class="space-y-4">
                    <div class="flex items-center p-3 rounded-lg bg-gray-800 bg-opacity-30 cursor-pointer">
                      <img src="https://i.scdn.co/image/ab67616d00001e02668e3aca3167e6e569a9aa20"
                        alt="Album" class="w-12 h-12 rounded mr-3" />
                      <div>
                        <h4 class="text-white">Midnight City</h4>
                        <p class="text-xs text-gray-400">M83</p>
                      </div>
                      <div class="ml-auto text-xs flex items-center text-purple-400">
                        <i class="fas fa-brain mr-1"></i> 92%
                      </div>
                    </div>

                    <div class="flex items-center p-3 rounded-lg bg-gray-800 bg-opacity-30 cursor-pointer">
                      <img src="https://i.scdn.co/image/ab67616d00001e02a3a0b2a0b2a0b2a0b2a0b2a0"
                        alt="Album" class="w-12 h-12 rounded mr-3" />
                      <div>
                        <h4 class="text-white">Electric Feel</h4>
                        <p class="text-xs text-gray-400">MGMT</p>
                      </div>
                      <div class="ml-auto text-xs flex items-center text-purple-400">
                        <i class="fas fa-brain mr-1"></i> 87%
                      </div>
                    </div>

                    <div class="flex items-center p-3 rounded-lg bg-gray-800 bg-opacity-30 cursor-pointer">
                      <img src="https://i.scdn.co/image/ab67616d00001e02b3a0b3a0b3a0b3a0b3a0b3a0"
                        alt="Album" class="w-12 h-12 rounded mr-3" />
                      <div>
                        <h4 class="text-white">Somebody Else</h4>
                        <p class="text-xs text-gray-400">The 1975</p>
                      </div>
                      <div class="ml-auto text-xs flex items-center text-purple-400">
                        <i class="fas fa-brain mr-1"></i> 85%
                      </div>
                    </div>
                  </div>

                  <button class="w-full mt-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium">
                    Generate More Recommendations
                  </button>
                </div>

                <div id="glass-card" className=" rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">
                    <i className="fas fa-history mr-2 text-purple-400"></i>
                    Recently Played
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    <div id="song-card" className=" bg-gray-800 bg-opacity-30 rounded-lg p-3 cursor-pointer">
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
                        alt="Album"
                        className="w-full rounded mb-2"
                      />
                      <h4 className="text-white text-sm truncate">Blinding Lights</h4>
                      <p className="text-xs text-gray-400 truncate">The Weeknd</p>
                    </div>

                    <div id="song-card" className=" bg-gray-800 bg-opacity-30 rounded-lg p-3 cursor-pointer">
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e02668e3aca3167e6e569a9aa20"
                        alt="Album"
                        className="w-full rounded mb-2"
                      />
                      <h4 className="text-white text-sm truncate">Midnight City</h4>
                      <p className="text-xs text-gray-400 truncate">M83</p>
                    </div>

                    <div id="song-card" className=" bg-gray-800 bg-opacity-30 rounded-lg p-3 cursor-pointer">
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e02a3a0b2a0b2a0b2a0b2a0b2a0"
                        alt="Album"
                        className="w-full rounded mb-2"
                      />
                      <h4 className="text-white text-sm truncate">Electric Feel</h4>
                      <p className="text-xs text-gray-400 truncate">MGMT</p>
                    </div>

                    <div id="song-card" className=" bg-gray-800 bg-opacity-30 rounded-lg p-3 cursor-pointer">
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e02b3a0b3a0b3a0b3a0b3a0b3a0"
                        alt="Album"
                        className="w-full rounded mb-2"
                      />
                      <h4 className="text-white text-sm truncate">Somebody Else</h4>
                      <p className="text-xs text-gray-400 truncate">The 1975</p>
                    </div>
                  </div>
                </div>
                <div id="glass-card" className=" rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">
                    <i className="fas fa-tags mr-2 text-purple-400"></i>
                    Mood & Activity Tags
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`tag px-3 py-1 ${tag.bg} bg-opacity-30 ${tag.text} rounded-full text-sm cursor-pointer`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 relative">
                    <input
                      type="text"
                      placeholder="Add custom tag..."
                      className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                    <button className="absolute right-2 top-2 text-purple-400 hover:text-purple-300">
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="glass-card" className=" rounded-xl p-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  <i className="fas fa-plus-circle mr-2 text-purple-400"></i>
                  Recently Added
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    id="song-card" className=" bg-gray-800 bg-opacity-30 rounded-lg p-3 cursor-pointer"
                  >
                    <img src={song.img} alt="Album" className="w-full rounded mb-2" />
                    <h4 className="text-white text-sm truncate">{song.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                    <div id="waveform" className=" mt-2 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
