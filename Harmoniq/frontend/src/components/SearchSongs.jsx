import React, { useState } from "react";
import axios from "axios";

export default function SearchSongs() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.post("http://localhost:3000/api/search", {
        query,
      });
      setResults(response.data.results);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  return (
    <>
    <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 w-96">
        <i className="fas fa-search text-gray-400 mr-2"></i>
        <input
          type="text"
          value={query}
          placeholder="Search for songs like 'happy chill beats'"
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none focus:outline-none text-white w-full"
        />
      </div>
      <button onClick={handleSearch} className="ml-1 bg-purple-700 text-white px-4 py-2 rounded-full">
        Search
      </button>

      <div style={{ marginTop: "2rem" }}>
        {results.map((song) => (
          <div key={song.id} style={{ marginBottom: "1rem" }}>
            <strong>{song.title}</strong> by {song.artist} <br />
            <em>{song.genre}</em> | Score: {song.score.toFixed(2)}
          </div>
        ))}
      </div>

    </>
  );
}
