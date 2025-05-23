import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenerateLyrics = ({ currentSong }) => {
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentSong) return;

      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/lyrics', {
          title: currentSong.title,
          artist: currentSong.artist
        });
        setLyrics(response.data.lyrics);
      } catch (err) {
        console.error('Lyrics generation failed:', err);
        setLyrics('Unable to generate lyrics at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <div className="mt-4 text-white text-center">
      {loading ? (
        <p className="text-purple-400 animate-pulse">Generating lyrics...</p>
      ) : (
        <pre className="whitespace-pre-wrap text-purple-300">{lyrics}</pre>
      )}
    </div>
  );
};

export default GenerateLyrics;
