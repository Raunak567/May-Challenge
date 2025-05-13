import React from 'react';

const MainContent = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Top Heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Discover New Music</h2>
        <div className="flex space-x-3">
          <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg text-sm">
            <i className="fas fa-sliders-h mr-2"></i> Filters
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            <i className="fas fa-random mr-2"></i> Shuffle
          </button>
        </div>
      </div>

      {/* Featured Album */}
      <div className="bg-slate-800 rounded-xl overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6 flex items-center justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                alt="Album"
                className="album-art rounded-lg w-full max-w-xs shadow-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700">
                  <i className="fas fa-play text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 p-6 flex flex-col justify-center">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2">FEATURED</span>
            <h1 className="text-4xl font-bold mb-2">Midnight Memories</h1>
            <p className="text-slate-400 mb-4">By The Dreamers • 2023 • 12 tracks</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Alternative', 'Indie', 'Dream Pop', 'Chill'].map((tag, i) => (
                <span key={i} className="tag bg-slate-700 text-blue-400 px-3 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-slate-300 mb-6">
              The Dreamers return with their most introspective work yet, blending ethereal soundscapes with raw emotional lyrics that capture the essence of late-night contemplation.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center">
                <i className="fas fa-play mr-2"></i> Play
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
                <i className="fas fa-heart"></i>
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <i className="fas fa-robot text-blue-400 mr-3"></i> AI Recommendations For You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Chill Focus Vibes',
              desc: 'Based on your recent listening',
              tags: ['ambient', 'study', 'lo-fi'],
              image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b',
            },
            {
              title: 'Workout Energy Boost',
              desc: 'Matches your morning routine',
              tags: ['electronic', 'high energy', 'motivation'],
              image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            },
            {
              title: 'Throwback Classics',
              desc: 'Similar to your favorites',
              tags: ['90s', 'nostalgia', 'rock'],
              image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
            },
            {
              title: 'Rainy Day Feels',
              desc: 'Perfect for today\'s weather',
              tags: ['acoustic', 'melancholy', 'singer-songwriter'],
              image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            },
          ].map((rec, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-colors"
            >
              <div className="relative">
                <img src={rec.image} alt="Album cover" className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">AI PICK</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium mb-1">{rec.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{rec.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {rec.tags.map((tag, i) => (
                    <span key={i} className="tag bg-slate-700 text-xs px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mood Playlists */}
      <section>
        <h3 className="text-xl font-bold mb-4">Mood & Activity</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Focus', desc: 'Concentration', from: 'blue-600', to: 'blue-800' },
            { label: 'Workout', desc: 'High Energy', from: 'purple-600', to: 'purple-800' },
            { label: 'Romance', desc: 'Love Songs', from: 'pink-600', to: 'pink-800' },
            { label: 'Chill', desc: 'Relaxation', from: 'green-600', to: 'green-800' },
            { label: 'Party', desc: 'Dance Hits', from: 'yellow-600', to: 'yellow-800' },
            { label: 'Sad', desc: 'Heartbreak', from: 'red-600', to: 'red-800' },
          ].map((mood, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br from-${mood.from} to-${mood.to} rounded-lg p-4 h-32 flex flex-col justify-end cursor-pointer hover:opacity-90 transition-opacity`}
            >
              <h4 className="font-medium">{mood.label}</h4>
              <p className="text-xs opacity-80">{mood.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
