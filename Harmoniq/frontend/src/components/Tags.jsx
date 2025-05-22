import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTags,
  faStar,
  faHeadphonesAlt,
  faGuitar,
  faMusic,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import styles from './Tags.module.css';

const tagPlaylists = {
  Pop: [
    { title: "Top Pop Hits", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e0251b31f8e62bc8f7b215c233a" },
    { title: "Pop Rising", artist: "Pop Stars", cover: "https://i.scdn.co/image/ab67616d00001e02f65849433b8ef9e4bf7a0c51" },
  ],
  "Hip-Hop": [
    { title: "Hip-Hop Central", artist: "Rap Masters", cover: "https://i.scdn.co/image/ab67616d00001e020fca9a68a66a4b97f9ae4a04" },
    { title: "Rap Caviar", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e029d1b3a7862f8a8bb183e7887" },
  ],
  Rock: [
    { title: "Rock Classics", artist: "Rock Legends", cover: "https://i.scdn.co/image/ab67616d00001e028cd9ae3f7a61a49a7d3ff7ab" },
    { title: "Alternative Rock", artist: "Alt Bands", cover: "https://i.scdn.co/image/ab67616d00001e0276f3f99c7c1d3a5a2357f3e6" },
  ],
  Jazz: [
    { title: "Jazz Vibes", artist: "Jazz Greats", cover: "https://i.scdn.co/image/ab67616d00001e02466f6ef12b796dd1e17f1f45" },
    { title: "Smooth Jazz", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e025d5416c22b3e3f79894767ea" },
  ],
  Electronic: [
    { title: "Electro Beats", artist: "EDM Artists", cover: "https://i.scdn.co/image/ab67616d00001e0273a4b3a41c87ffb6d18d4ec9" },
    { title: "Dance EDM", artist: "Party DJs", cover: "https://i.scdn.co/image/ab67616d00001e0257ee0d1287f138e63b7be289" },
  ],
  Classical: [
    { title: "Classical Essentials", artist: "Mozart & More", cover: "https://i.scdn.co/image/ab67616d00001e021ee40f7f03f5b1f3b5f59eb6" },
    { title: "Relaxing Classical", artist: "Various Artists", cover: "https://i.scdn.co/image/ab67616d00001e02a61e6e52f6c6b015f0ef41d7" },
  ],
};

const tagConfig = [
  { name: 'Pop', icon: faStar, color: 'Pink' },
  { name: 'Hip-Hop', icon: faHeadphonesAlt, color: 'Yellow' },
  { name: 'Rock', icon: faGuitar, color: 'Red' },
  { name: 'Jazz', icon: faMusic, color: 'Blue' },
  { name: 'Electronic', icon: faBolt, color: 'Purple' },
  { name: 'Classical', icon: faMusic, color: 'Green' }
];

const Tags = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <div className={`${styles.container} mt-12 w-full`}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <FontAwesomeIcon icon={faTags} className="mr-2 text-pink-400" />
        Explore by Tags
      </h2>

      {/* Tags Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 w-full">
        {tagConfig.map(({ name, icon, color }) => (
          <button
            key={name}
            onClick={() => handleTagClick(name)}
            className={`
              ${styles.tag}
              ${styles[`tag${color}`]}
              cursor-pointer px-4 py-3 rounded-full 
              text-center font-medium
              ${selectedTag === name ? 'ring-2 ring-white/20' : ''}
            `}
          >
            <FontAwesomeIcon 
              icon={icon} 
              className={`mb-2 text-xl ${selectedTag === name ? 'text-white' : `text-${color.toLowerCase()}-400`}`}
            />
            <span className={`block ${selectedTag === name ? 'text-white' : `text-${color.toLowerCase()}-300`}`}>
              {name}
            </span>
          </button>
        ))}
      </div>

      {/* Recommended Playlists for tags */}
      <div className={`${styles.glassCard} rounded-xl p-6`}>
        <h3 className="text-xl font-bold text-white mb-4">
          {selectedTag ? `${selectedTag} Playlists` : 'Select a tag to see playlists'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTag && tagPlaylists[selectedTag]?.map((playlist, index) => (
            <div 
              key={index}
              className={`${styles.songCard} rounded-lg p-4 cursor-pointer flex items-center space-x-4`}
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
  );
};

export default Tags; 